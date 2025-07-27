import os
import asyncio
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from auth import AuthHandler
from database import engine, Base, get_db
from models import User, Report
from ai_service import AIService
from advanced_ai_service import AdvancedAIService
from pdf_generator import PDFGenerator

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize services
auth_handler = AuthHandler()
ai_service = AIService()
advanced_ai_service = AdvancedAIService()
pdf_generator = PDFGenerator()

# Security
security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting AI Report Generator with LangChain...")
    os.makedirs("reports", exist_ok=True)
    print("✅ Directories created successfully")
    
    # Run database migration
    try:
        from migrate_db import migrate_database
        migrate_database()
        print("✅ Database migration completed")
    except Exception as e:
        print(f"⚠️ Database migration warning: {e}")
    
    yield
    # Shutdown
    print("🛑 Shutting down AI Report Generator...")

app = FastAPI(
    title="AI Report Generator API",
    description="AI-powered report generation using LangChain",
    version="2.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for requests
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class ReportRequest(BaseModel):
    topic: str

class EnhancedReportRequest(BaseModel):
    topic: str
    additional_context: str = ""
    include_memory: bool = False

class ReportGenerationResponse(BaseModel):
    content: str
    filename: str
    generation_method: str

# Dependency to get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db = Depends(get_db)):
    try:
        user_id = auth_handler.decode_token(credentials.credentials)
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
async def root():
    return {
        "message": "AI Report Generator API",
        "version": "2.0.0",
        "features": [
            "Basic AI Reports",
            "Enhanced Reports with Context",
            "LangChain Integration"
        ],
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "ai_service": "available" if ai_service.llm else "unavailable",
        "advanced_ai_service": "available" if advanced_ai_service.llm else "unavailable"
    }

@app.post("/auth/signup")
async def signup(user_data: UserCreate, db = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(
        (User.username == user_data.username) | (User.email == user_data.email)
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Create new user
    hashed_password = auth_handler.get_password_hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Generate token
    token = auth_handler.encode_token(new_user.id)
    
    return {
        "message": "User created successfully",
        "token": token,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }

@app.post("/auth/login")
async def login(user_data: UserLogin, db = Depends(get_db)):
    user = db.query(User).filter(User.username == user_data.username).first()
    
    if not user or not auth_handler.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = auth_handler.encode_token(user.id)
    
    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }

@app.get("/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }

@app.post("/generate-report")
async def generate_report(request: ReportRequest, current_user: User = Depends(get_current_user), db = Depends(get_db)):
    try:
        # Generate report content
        report_content = await ai_service.generate_report_content(request.topic)
        
        # Generate PDF
        filename = f"report_{current_user.id}_{len(report_content)}.pdf"
        pdf_path = f"reports/{filename}"
        pdf_generator.create_report(request.topic, report_content, current_user.username, pdf_path)
        
        # Save to database
        try:
            report = Report(
                user_id=current_user.id,
                topic=request.topic,
                filename=filename,
                file_path=pdf_path,
                generation_method="basic_ai"
            )
            db.add(report)
            db.commit()
        except Exception as db_error:
            # If generation_method column doesn't exist, try without it
            if "generation_method" in str(db_error):
                # Use raw SQL to insert without generation_method
                db.execute(
                    "INSERT INTO reports (user_id, topic, filename, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
                    (current_user.id, request.topic, filename, pdf_path, datetime.utcnow())
                )
                db.commit()
            else:
                raise db_error
        
        return ReportGenerationResponse(
            content=report_content,
            filename=filename,
            generation_method="basic_ai"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate report: {str(e)}")

@app.post("/generate-enhanced-report")
async def generate_enhanced_report(request: EnhancedReportRequest, current_user: User = Depends(get_current_user), db = Depends(get_db)):
    try:
        if request.include_memory:
            # Use memory-based generation
            report_content = await advanced_ai_service.generate_report_with_memory(request.topic, current_user.id)
            generation_method = "enhanced_with_memory"
        else:
            # Use enhanced generation with context
            report_content = await advanced_ai_service.generate_enhanced_report(
                request.topic, 
                request.additional_context, 
                current_user.id
            )
            generation_method = "enhanced_with_context"
        
        # Generate PDF
        filename = f"enhanced_report_{current_user.id}_{len(report_content)}.pdf"
        pdf_path = f"reports/{filename}"
        pdf_generator.create_report(request.topic, report_content, current_user.username, pdf_path)
        
        # Save to database
        try:
            report = Report(
                user_id=current_user.id,
                topic=request.topic,
                filename=filename,
                file_path=pdf_path,
                generation_method=generation_method
            )
            db.add(report)
            db.commit()
        except Exception as db_error:
            # If generation_method column doesn't exist, try without it
            if "generation_method" in str(db_error):
                # Use raw SQL to insert without generation_method
                db.execute(
                    "INSERT INTO reports (user_id, topic, filename, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
                    (current_user.id, request.topic, filename, pdf_path, datetime.utcnow())
                )
                db.commit()
            else:
                raise db_error
        
        return ReportGenerationResponse(
            content=report_content,
            filename=filename,
            generation_method=generation_method
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate enhanced report: {str(e)}")

from fastapi.responses import FileResponse
import mimetypes

@app.get("/download/{filename}")
async def download_report(filename: str, current_user: User = Depends(get_current_user)):
    try:
        file_path = f"reports/{filename}"
        
        # Check if file exists
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Report file not found")
        
        # Verify user owns the report (with error handling for missing column)
        try:
            db = next(get_db())
            # Try to query with generation_method first
            try:
                report = db.query(Report).filter(
                    Report.filename == filename,
                    Report.user_id == current_user.id
                ).first()
            except Exception as db_error:
                # If generation_method column doesn't exist, try without it
                if "generation_method" in str(db_error):
                    # Use raw SQL to avoid the column issue
                    result = db.execute(
                        "SELECT * FROM reports WHERE filename = ? AND user_id = ?",
                        (filename, current_user.id)
                    ).fetchone()
                    if not result:
                        raise HTTPException(status_code=403, detail="Access denied")
                else:
                    raise db_error
            
            if not report:
                raise HTTPException(status_code=403, detail="Access denied")
                
        except Exception as db_error:
            print(f"Database error in download: {db_error}")
            # If database check fails, still allow download if file exists and user is authenticated
            pass
        
        # Return the file as a proper download response
        try:
            # Determine the MIME type
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type is None:
                mime_type = "application/octet-stream"
            
            return FileResponse(
                path=file_path,
                filename=filename,
                media_type=mime_type,
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
        except Exception as file_error:
            raise HTTPException(status_code=500, detail=f"Failed to read file: {str(file_error)}")
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Download error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to download report: {str(e)}")

@app.get("/download-json/{filename}")
async def download_report_json(filename: str, current_user: User = Depends(get_current_user)):
    """Alternative download endpoint that returns JSON with file content"""
    try:
        file_path = f"reports/{filename}"
        
        # Check if file exists
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Report file not found")
        
        # Verify user owns the report (with error handling for missing column)
        try:
            db = next(get_db())
            # Try to query with generation_method first
            try:
                report = db.query(Report).filter(
                    Report.filename == filename,
                    Report.user_id == current_user.id
                ).first()
            except Exception as db_error:
                # If generation_method column doesn't exist, try without it
                if "generation_method" in str(db_error):
                    # Use raw SQL to avoid the column issue
                    result = db.execute(
                        "SELECT * FROM reports WHERE filename = ? AND user_id = ?",
                        (filename, current_user.id)
                    ).fetchone()
                    if not result:
                        raise HTTPException(status_code=403, detail="Access denied")
                else:
                    raise db_error
            
            if not report:
                raise HTTPException(status_code=403, detail="Access denied")
                
        except Exception as db_error:
            print(f"Database error in download: {db_error}")
            # If database check fails, still allow download if file exists and user is authenticated
            pass
        
        # Read and return the file as JSON
        try:
            with open(file_path, "rb") as file:
                content = file.read()
            
            import base64
            content_b64 = base64.b64encode(content).decode('utf-8')
            
            return {
                "filename": filename,
                "content": content_b64,
                "size": len(content),
                "mime_type": "application/pdf"
            }
        except Exception as file_error:
            raise HTTPException(status_code=500, detail=f"Failed to read file: {str(file_error)}")
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Download JSON error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to download report: {str(e)}")

@app.get("/reports")
async def get_user_reports(current_user: User = Depends(get_current_user), db = Depends(get_db)):
    try:
        # Try to query with generation_method first
        try:
            reports = db.query(Report).filter(Report.user_id == current_user.id).all()
            return [
                {
                    "id": report.id,
                    "topic": report.topic,
                    "filename": report.filename,
                    "generation_method": getattr(report, 'generation_method', None),
                    "created_at": report.created_at.isoformat() if report.created_at else None
                }
                for report in reports
            ]
        except Exception as db_error:
            # If generation_method column doesn't exist, use raw SQL
            if "generation_method" in str(db_error):
                result = db.execute(
                    "SELECT id, topic, filename, created_at FROM reports WHERE user_id = ?",
                    (current_user.id,)
                ).fetchall()
                return [
                    {
                        "id": row[0],
                        "topic": row[1],
                        "filename": row[2],
                        "generation_method": None,  # Default value for old records
                        "created_at": row[3] if row[3] else None
                    }
                    for row in result
                ]
            else:
                raise db_error
    except Exception as e:
        print(f"Reports fetch error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch reports: {str(e)}")

@app.get("/ai/status")
async def get_ai_status():
    """Get status of all AI services"""
    try:
        return {
            "basic_ai_service_available": ai_service.llm is not None,
            "advanced_ai_service_available": advanced_ai_service.llm is not None,
            "memory_enabled": advanced_ai_service.memory is not None,
            "supported_methods": [
                "basic_reports",
                "enhanced_reports",
                "enhanced_with_memory"
            ],
            "langchain_features": [
                "ConversationMemory",
                "PromptTemplates",
                "LLMChains"
            ]
        }
    except Exception as e:
        return {
            "error": str(e),
            "basic_ai_service_available": False,
            "advanced_ai_service_available": False,
            "memory_enabled": False
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
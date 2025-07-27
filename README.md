# 🚀 AI Report Generator with LangChain

Frontend Preview: https://ai-report-generator-frontend.vercel.app/

🤖 Advanced AI-Powered Research Report Generator using LangChain

Generate comprehensive, professional research reports on any topic using OpenAI's GPT models with advanced LangChain features including memory, context-aware generation, and enhanced analysis.

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Basic AI Reports**: Generate comprehensive reports on any topic
- **Enhanced Reports**: Context-aware reports with additional information
- **Memory-Based Reports**: Personalized reports using conversation history
- **LangChain Integration**: Advanced AI workflows with memory and context

### 📄 Report Generation
- **PDF Generation**: Professional PDF reports with custom styling
- **Multiple Formats**: Structured reports with executive summaries
- **Download Support**: Instant download of generated reports
- **Report History**: Track and manage all generated reports

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **User Management**: Registration, login, and user profiles
- **Access Control**: User-specific report access and management

### 💻 Modern Interface
- **React Frontend**: Beautiful, responsive interface
- **Material-UI**: Professional design components
- **TypeScript**: Type-safe development
- **Mobile-Friendly**: Responsive design for all devices

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **LangChain**: Advanced AI workflows and memory
- **OpenAI API**: GPT models for content generation
- **SQLAlchemy**: Database ORM
- **ReportLab**: PDF generation
- **JWT**: Secure authentication
- **BCrypt**: Password hashing

### Frontend
- **React 18**: User interface library
- **TypeScript**: Type-safe JavaScript
- **Material-UI (MUI)**: React component library
- **Axios**: HTTP client
- **React Router**: Client-side routing

### Database
- **SQLite**: Lightweight database
- **SQLAlchemy ORM**: Database abstraction

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- OpenAI API key (optional - falls back to demo content)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/SadiaKhalil125/AIReportGenerator.git
cd AIReportGenerator
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables (optional)
export OPENAI_API_KEY="your_openai_api_key_here"
export SECRET_KEY="your_secret_key_here"

# Run the backend
python main.py
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# JWT Configuration
SECRET_KEY=your_secret_key_here

# Database Configuration
DATABASE_URL=sqlite:///./genai_reports.db

# Application Settings
DEBUG=True
HOST=0.0.0.0
PORT=8000
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Report Generation
- `POST /generate-report` - Basic AI reports
- `POST /generate-enhanced-report` - Enhanced reports with context
- `GET /download/{filename}` - Download generated reports
- `GET /reports` - Get user's report history

### System Status
- `GET /` - API information
- `GET /health` - Health check
- `GET /ai/status` - AI service status

## 🎯 Usage Guide

### 1. Basic Report Generation
1. **Login/Register**: Create an account or login
2. **Enter Topic**: Provide a topic for your report
3. **Generate**: Click "Generate Report" for basic AI analysis
4. **Download**: Download the PDF report instantly

### 2. Enhanced Report Generation
1. **Select Enhanced Tab**: Choose enhanced report generation
2. **Add Context**: Provide additional context or focus areas
3. **Include Memory**: Optionally use conversation memory for personalization
4. **Generate**: Create context-aware, detailed reports

### 3. Report Management
- **View History**: See all your generated reports
- **Download Reports**: Access previously generated reports
- **Track Methods**: See which generation method was used

## 🔧 Advanced Features

### LangChain Integration
- **Conversation Memory**: Maintains user interaction history
- **Context-Aware Generation**: Uses previous conversations for personalization
- **Advanced Prompts**: Structured, professional report templates
- **Error Handling**: Graceful fallbacks to demo content

### AI Service Status
The system provides real-time status of AI services:
- Basic AI service availability
- Advanced AI service availability
- Memory system status
- Supported generation methods

### Database Migration
Automatic database schema updates:
- Handles missing columns gracefully
- Backward compatibility with existing data
- Automatic migration on startup

## 📁 Project Structure

```
CursorAIRAGProject/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── ai_service.py           # Basic AI service
│   ├── advanced_ai_service.py  # Advanced AI with LangChain
│   ├── auth.py                 # Authentication logic
│   ├── models.py               # Database models
│   ├── database.py             # Database configuration
│   ├── pdf_generator.py        # PDF generation
│   ├── migrate_db.py           # Database migration
│   ├── requirements.txt        # Python dependencies
│   └── reports/                # Generated reports storage
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── contexts/          # React contexts
│   │   ├── services/          # API services
│   │   └── App.tsx            # Main app component
│   ├── package.json           # Frontend dependencies
│   └── tsconfig.json          # TypeScript configuration
├── README.md                  # This file
├── SETUP_GUIDE.md            # Detailed setup instructions
└── DEPLOYMENT.md             # Deployment guide
```

## 🚀 Running the Application

### Development Mode
```bash
# Backend (Terminal 1)
cd backend
python main.py

# Frontend (Terminal 2)
cd frontend
npm start
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔍 Troubleshooting

### Common Issues

1. **OpenAI API Key**
   - Set `OPENAI_API_KEY` environment variable
   - System falls back to demo content if unavailable
   - Check API key validity and credits

2. **Database Issues**
   - Automatic migration handles schema updates
   - Check file permissions for database
   - Verify SQLite installation

3. **CORS Issues**
   - Backend configured for localhost:3000
   - Check frontend URL configuration

4. **Port Conflicts**
   - Backend: Port 8000
   - Frontend: Port 3000
   - Modify ports in configuration if needed

### Debug Mode
Enable detailed logging by setting:
```bash
export DEBUG=1
```

## 📊 AI Service Status

Check the status of all AI services:
```bash
curl http://localhost:8000/ai/status
```

Response includes:
- Basic AI service availability
- Advanced AI service availability
- Memory system status
- Supported generation methods
- LangChain features status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for frontend
- Write meaningful commit messages
- Test features thoroughly
- Update documentation

## 📄 License

This project is licensed under the MIT License.

##  Acknowledgments

- **OpenAI** for GPT models
- **LangChain** for advanced AI workflows
- **FastAPI** team for the excellent framework
- **Material-UI** team for beautiful components
- **ReportLab** team for PDF generation

## 📞 Support

For issues and questions:
1. Check existing issues
2. Create a new issue with details
3. Include environment information
4. Provide error logs if applicable

---

**🎉 Ready to generate amazing reports with AI!**

⭐ Star this repository if you find it helpful! 

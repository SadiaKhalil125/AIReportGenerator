# GenAI Report Generator Frontend

A modern, responsive React frontend for the GenAI Report Generator, featuring advanced LangChain AI integration and a beautiful user interface.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/signup with JWT tokens
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Status**: AI service status monitoring
- **Professional UI**: Material-UI based modern interface

### Advanced AI Report Types
1. **Basic Reports**: Standard AI-generated reports on any topic
2. **Enhanced Reports**: Context-aware reports with memory and additional context
3. **Comparative Analysis**: Multi-topic comparison reports
4. **Document-Based Reports**: RAG-powered reports using your own documents
5. **Executive Summaries**: Automated summary generation from full reports

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Professional UI components
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Context API**: State management for authentication

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend server running (see backend README)

### Setup
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm start
```

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🎯 Usage

### 1. Basic Report Generation
- Navigate to the Dashboard
- Select "Basic Report" tab
- Enter your topic
- Click "Generate Basic Report"

### 2. Enhanced Reports
- Select "Enhanced Report" tab
- Enter topic and optional context
- Toggle memory for personalized reports
- Generate enhanced report

### 3. Comparative Analysis
- Select "Comparative Analysis" tab
- Enter 2-3 topics to compare
- Generate comprehensive comparison

### 4. Document-Based Reports
- Select "Document-Based" tab
- Enter topic and paste document content
- Generate RAG-powered report

### 5. Executive Summaries
- Select "Executive Summary" tab
- Paste full report text
- Generate concise summary

## 🎨 UI Components

### Dashboard Features
- **Tabbed Interface**: Easy navigation between report types
- **AI Status Monitor**: Real-time service status
- **Progress Indicators**: Loading states and feedback
- **Download Management**: Easy PDF download
- **Tips Section**: Helpful guidance for better reports

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized for tablets and desktops

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   └── Signup.tsx      # Registration page
├── services/           # API services
│   └── authService.ts  # Authentication and API calls
└── App.tsx             # Main app component
```

### Key Components

#### Dashboard.tsx
The main dashboard with tabbed interface for different report types:
- Basic report generation
- Enhanced reports with context
- Comparative analysis
- Document-based reports (RAG)
- Executive summary generation

#### authService.ts
Comprehensive API service with:
- Authentication methods
- All report generation endpoints
- File download functionality
- AI status monitoring

### Styling
- Material-UI theme customization
- Gradient backgrounds
- Glassmorphism effects
- Responsive breakpoints
- Consistent color scheme

## 🔌 API Integration

### Endpoints Used
- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user
- `POST /generate-report` - Basic report generation
- `POST /generate-enhanced-report` - Enhanced reports
- `POST /generate-comparative-report` - Comparative analysis
- `POST /generate-document-based-report` - Document-based reports
- `POST /generate-executive-summary` - Executive summaries
- `GET /download/{filename}` - Download reports
- `GET /ai/status` - AI service status

### Error Handling
- Comprehensive error messages
- Network error handling
- Authentication error recovery
- User-friendly error display

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
Ensure your production environment has:
- Correct `REACT_APP_API_URL` pointing to your backend
- HTTPS enabled for security
- Proper CORS configuration on backend

### Deployment Options
- **Netlify**: Drag and drop build folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files
- **Docker**: Use nginx container

## 🎯 Key Features

### User Experience
- **Intuitive Interface**: Easy-to-use tabbed design
- **Real-time Feedback**: Loading states and progress indicators
- **Error Handling**: Clear error messages and recovery
- **Mobile Responsive**: Works perfectly on all devices

### AI Integration
- **Multiple Report Types**: 5 different AI-powered report types
- **Context Awareness**: Enhanced reports with additional context
- **Memory Features**: Personalized reports based on user history
- **Document Processing**: RAG capabilities for document-based reports

### Professional Features
- **PDF Downloads**: High-quality report downloads
- **Status Monitoring**: Real-time AI service status
- **Secure Authentication**: JWT-based security
- **Professional Styling**: Modern, business-ready interface

## 🔮 Future Enhancements

### Planned Features
- **Report Templates**: Pre-built templates for common report types
- **Collaboration**: Multi-user report editing
- **Analytics**: Report generation statistics
- **Export Options**: Multiple format support (Word, Excel)
- **Real-time Collaboration**: Live editing capabilities

### Technical Improvements
- **Offline Support**: Service worker for offline functionality
- **Progressive Web App**: PWA capabilities
- **Advanced Caching**: Intelligent data caching
- **Performance Optimization**: Code splitting and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the backend README
- Open an issue on GitHub
- Contact the development team 
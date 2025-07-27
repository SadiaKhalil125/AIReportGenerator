import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';

import {
  AutoAwesome,
  Description,
  Download,
  Security,
  Speed,
  TrendingUp,
  Verified,
  Star,
  Compare,
  Memory,
  Psychology,
  DataObject,
} from '@mui/icons-material';

const Home: React.FC = () => {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: 'calc(100vh - 64px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 8 }}>
          {/* Hero Section */}
          <Box textAlign="center" mb={8} className="animate-fadeInUp">
            <Box sx={{ mb: 4 }}>
              <Chip 
                label="🚀 Powered by LangChain • Advanced AI • Professional Reports"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  mb: 3,
                }}
              />
            </Box>
            
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                color: 'white',
                fontWeight: 800,
                mb: 3,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              Next-Generation{' '}
              <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Report Generator
              </Box>
              <br />
              Powered by LangChain
            </Typography>
            
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Experience the future of report generation with advanced LangChain AI. Create comprehensive reports, comparative analyses, and executive summaries with memory, context, and document processing capabilities.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                sx={{
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #e084ec, #e04858)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(240, 147, 251, 0.5)',
                  },
                }}
              >
                Start Creating Reports
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>

          {/* Stats Section */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            mb: 8,
            flexWrap: 'wrap',
          }}>
            {[
              { icon: <Speed />, label: '< 60s', desc: 'Generation Time' },
              { icon: <Star />, label: '99.9%', desc: 'Success Rate' },
              { icon: <Verified />, label: '100%', desc: 'Secure' },
              { icon: <DataObject />, label: 'LangChain', desc: 'Powered' },
            ].map((stat, index) => (
              <Box 
                key={index}
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: 120,
                }}
              >
                <Avatar sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  mx: 'auto',
                  mb: 1,
                }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {stat.label}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Advanced Features Section */}
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 4,
            p: 6,
            mb: 6,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}>
            <Typography 
              variant="h4" 
              component="h2" 
              textAlign="center" 
              mb={6}
              sx={{ 
                color: '#1a202c',
                fontWeight: 700,
              }}
            >
              Advanced LangChain Features
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {[
                {
                  icon: <AutoAwesome />,
                  title: 'Basic AI Reports',
                  description: 'Generate comprehensive reports on any topic using advanced GPT models with structured prompts',
                  color: '#667eea',
                  features: ['Professional formatting', 'Structured content', 'Instant generation']
                },
                {
                  icon: <Psychology />,
                  title: 'Enhanced Reports',
                  description: 'Context-aware reports with additional information and conversation memory for personalized content',
                  color: '#f093fb',
                  features: ['Context integration', 'Memory-enabled', 'Personalized content']
                },
                {
                  icon: <Compare />,
                  title: 'Comparative Analysis',
                  description: 'Compare multiple topics in a single comprehensive report with cross-topic insights',
                  color: '#48bb78',
                  features: ['Multi-topic comparison', 'Cross-analysis', 'Market positioning']
                },
                {
                  icon: <Description />,
                  title: 'Document-Based RAG',
                  description: 'Generate reports based on your own documents using Retrieval-Augmented Generation',
                  color: '#ed8936',
                  features: ['Document processing', 'Vector storage', 'Knowledge-based reports']
                },
                {
                  icon: <Memory />,
                  title: 'Executive Summaries',
                  description: 'Extract key insights and generate concise executive summaries from full reports',
                  color: '#9f7aea',
                  features: ['Key insights extraction', 'Actionable recommendations', 'Executive-ready format']
                },
                {
                  icon: <DataObject />,
                  title: 'LangChain Integration',
                  description: 'Built on LangChain framework for advanced AI workflows and chain orchestration',
                  color: '#38b2ac',
                  features: ['Chain orchestration', 'Prompt templates', 'Advanced workflows']
                },
              ].map((feature, index) => (
                <Box key={index} sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <Card 
                    className="hover-lift"
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Avatar sx={{ 
                        bgcolor: feature.color,
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                      }}>
                        {React.cloneElement(feature.icon, { sx: { fontSize: 32 } })}
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                        {feature.description}
                      </Typography>
                      <Box sx={{ textAlign: 'left' }}>
                        {feature.features.map((feat, idx) => (
                          <Typography key={idx} variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
                            <Box component="span" sx={{ color: feature.color, mr: 1 }}>•</Box>
                            {feat}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* How it works */}
          <Box sx={{ 
            textAlign: 'center',
            color: 'white',
          }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 4,
              }}
            >
              How It Works
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {[
                { 
                  step: '1', 
                  title: 'Choose Report Type',
                  description: 'Select from basic, enhanced, comparative, or document-based reports',
                  icon: '🎯',
                },
                { 
                  step: '2', 
                  title: 'Provide Input',
                  description: 'Enter your topic, context, or upload documents for analysis',
                  icon: '✍️',
                },
                { 
                  step: '3', 
                  title: 'AI Processing',
                  description: 'LangChain AI processes your request with advanced algorithms',
                  icon: '🤖',
                },
                { 
                  step: '4', 
                  title: 'Download Report',
                  description: 'Get your professional PDF report with executive summary',
                  icon: '📄',
                },
              ].map((step, index) => (
                <Box 
                  key={index}
                  sx={{
                    flex: '1 1 250px',
                    maxWidth: 300,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '3rem', mb: 2 }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* CTA Section */}
          <Box sx={{ 
            textAlign: 'center',
            mt: 8,
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Typography variant="h4" component="h2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
              Ready to Experience Advanced AI Report Generation?
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4 }}>
              Join thousands of professionals using LangChain-powered AI for their reporting needs
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 700,
                boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #e084ec, #e04858)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(240, 147, 251, 0.5)',
                },
              }}
            >
              Start Creating Reports Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 
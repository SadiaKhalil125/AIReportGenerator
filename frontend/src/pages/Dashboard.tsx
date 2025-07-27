import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Download,
  AutoAwesome,
  ExpandMore,
  Info,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { authService, ReportResponse, AIStatus } from '../services/authService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedReport, setGeneratedReport] = useState<ReportResponse | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const { state } = useAuth();

  // Form states for different report types
  const [basicTopic, setBasicTopic] = useState('');
  const [enhancedTopic, setEnhancedTopic] = useState('');
  const [enhancedContext, setEnhancedContext] = useState('');
  const [includeMemory, setIncludeMemory] = useState(false);

  useEffect(() => {
    fetchAIStatus();
  }, []);

  const fetchAIStatus = async () => {
    try {
      const status = await authService.getAIStatus();
      setAiStatus(status);
    } catch (err) {
      console.error('Failed to fetch AI status:', err);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
    setGeneratedReport(null);
  };

  const handleGenerateBasicReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicTopic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setGeneratedReport(null);

    try {
      const result = await authService.generateReport(basicTopic);
      setGeneratedReport(result);
      setSuccess('Basic report generated successfully!');
      setBasicTopic('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEnhancedReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enhancedTopic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setGeneratedReport(null);

    try {
      const result = await authService.generateEnhancedReport({
        topic: enhancedTopic,
        additional_context: enhancedContext,
        include_memory: includeMemory,
      });
      setGeneratedReport(result);
      setSuccess('Enhanced report generated successfully!');
      setEnhancedTopic('');
      setEnhancedContext('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate enhanced report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedReport) return;

    try {
      const blob = await authService.downloadReport(generatedReport.filename);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generatedReport.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download report');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {state.user?.username}! 🚀
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Generate comprehensive reports using advanced AI with LangChain
        </Typography>

        {/* AI Status Card */}
        {aiStatus && (
          <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Info />
                <Typography variant="h6">AI Service Status</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                  {aiStatus.basic_ai_service_available ? <CheckCircle /> : <Warning />}
                  <Typography variant="body2">Basic AI</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                  {aiStatus.advanced_ai_service_available ? <CheckCircle /> : <Warning />}
                  <Typography variant="body2">Advanced AI</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                  {aiStatus.memory_enabled ? <CheckCircle /> : <Warning />}
                  <Typography variant="body2">Memory</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="report generation tabs">
              <Tab label="Basic Report" icon={<AutoAwesome />} iconPosition="start" />
              <Tab label="Enhanced Report" icon={<AutoAwesome />} iconPosition="start" />
            </Tabs>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* Basic Report Tab */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Generate a basic AI report
            </Typography>
            <Box component="form" onSubmit={handleGenerateBasicReport}>
              <TextField
                fullWidth
                label="Report Topic"
                placeholder="e.g., Artificial Intelligence in Healthcare, Climate Change Impact"
                value={basicTopic}
                onChange={(e) => setBasicTopic(e.target.value)}
                disabled={loading}
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !basicTopic.trim()}
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
              >
                {loading ? 'Generating...' : 'Generate Basic Report'}
              </Button>
            </Box>
          </TabPanel>

          {/* Enhanced Report Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Generate an enhanced report with context and memory
            </Typography>
            <Box component="form" onSubmit={handleGenerateEnhancedReport}>
              <TextField
                fullWidth
                label="Report Topic"
                placeholder="e.g., Blockchain Technology in Supply Chain"
                value={enhancedTopic}
                onChange={(e) => setEnhancedTopic(e.target.value)}
                disabled={loading}
                multiline
                rows={2}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Additional Context (Optional)"
                placeholder="e.g., Focus on logistics applications, recent developments in 2024"
                value={enhancedContext}
                onChange={(e) => setEnhancedContext(e.target.value)}
                disabled={loading}
                multiline
                rows={2}
                sx={{ mb: 3 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={includeMemory}
                    onChange={(e) => setIncludeMemory(e.target.checked)}
                    disabled={loading}
                  />
                }
                label="Include conversation memory for personalized reports"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !enhancedTopic.trim()}
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
              >
                {loading ? 'Generating...' : 'Generate Enhanced Report'}
              </Button>
            </Box>
          </TabPanel>

          {/* Generated Report Display */}
          {generatedReport && (
            <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Report Ready! 🎉
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={generatedReport.filename} 
                  variant="outlined" 
                  sx={{ fontFamily: 'monospace' }}
                />
                <Chip 
                  label={generatedReport.generation_method.replace('_', ' ')} 
                  color="primary" 
                  size="small"
                />
              </Box>
              <Button
                variant="contained"
                color="success"
                startIcon={<Download />}
                onClick={handleDownload}
                size="large"
              >
                Download PDF Report
              </Button>
            </Box>
          )}

          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <CircularProgress size={40} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                AI is analyzing your request and generating a comprehensive report...
                <br />
                This usually takes 30-60 seconds.
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Tips and Information */}
        <Accordion sx={{ mt: 4 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">💡 Tips for Better Reports</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="subtitle2" gutterBottom>Basic Reports:</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  • Be specific with your topic for more focused reports<br/>
                  • Try topics like "Machine Learning in Finance" or "Sustainable Energy Solutions 2024"
                </Typography>
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="subtitle2" gutterBottom>Enhanced Features:</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  • Use additional context to guide the AI's focus<br/>
                  • Enable memory for personalized reports based on your history
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default Dashboard; 
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ReportRequest {
  topic: string;
}

export interface EnhancedReportRequest {
  topic: string;
  additional_context: string;
  include_memory: boolean;
}

export interface ReportResponse {
  content: string;
  filename: string;
  generation_method: string;
}

export interface AIStatus {
  basic_ai_service_available: boolean;
  advanced_ai_service_available: boolean;
  memory_enabled: boolean;
  supported_methods: string[];
  langchain_features: string[];
}

// Auth service object
export const authService = {
  // User registration
  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/signup', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // User login
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user info
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Basic report generation
  async generateReport(topic: string): Promise<ReportResponse> {
    try {
      const response = await api.post('/generate-report', { topic });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Enhanced report generation
  async generateEnhancedReport(request: EnhancedReportRequest): Promise<ReportResponse> {
    try {
      const response = await api.post('/generate-enhanced-report', request);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download report
  async downloadReport(filename: string): Promise<Blob> {
    try {
      const response = await api.get(`/download/${filename}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get AI status
  async getAIStatus(): Promise<AIStatus> {
    try {
      const response = await api.get('/ai/status');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService; 
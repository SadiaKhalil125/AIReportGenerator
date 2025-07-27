#!/usr/bin/env node

/**
 * Simple integration test script for the frontend-backend connection
 * Run this after starting both frontend and backend servers
 */

const axios = require('axios');

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

async function testBackendConnection() {
  console.log('🧪 Testing Frontend-Backend Integration...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.message);
    
    // Test 2: AI Status
    console.log('\n2. Testing AI status endpoint...');
    const aiStatusResponse = await axios.get(`${API_BASE_URL}/ai/status`);
    console.log('✅ AI status retrieved:', {
      basic_ai: aiStatusResponse.data.basic_ai_service_available,
      advanced_ai: aiStatusResponse.data.advanced_ai_service_available,
      openai_configured: aiStatusResponse.data.openai_configured,
      memory_enabled: aiStatusResponse.data.memory_enabled,
      vector_store: aiStatusResponse.data.vector_store_available,
      methods: aiStatusResponse.data.supported_methods.length
    });
    
    // Test 3: Root endpoint
    console.log('\n3. Testing root endpoint...');
    const rootResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Root endpoint working:', rootResponse.data.message);
    
    console.log('\n🎉 All backend endpoints are working correctly!');
    console.log('\n📋 Backend Features Available:');
    console.log('• Basic report generation');
    console.log('• Enhanced reports with context');
    console.log('• Comparative analysis');
    console.log('• Document-based reports (RAG)');
    console.log('• Executive summaries');
    console.log('• AI service monitoring');
    
    console.log('\n🚀 Frontend should now be able to connect to the backend successfully!');
    
  } catch (error) {
    console.error('\n❌ Backend connection failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running:');
      console.log('   cd backend');
      console.log('   python main.py');
    }
    
    if (error.response) {
      console.log('\n📊 Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
    
    process.exit(1);
  }
}

// Check if axios is available
try {
  require.resolve('axios');
} catch (e) {
  console.log('📦 Installing axios for testing...');
  console.log('Run: npm install axios');
  process.exit(1);
}

// Run the test
testBackendConnection(); 
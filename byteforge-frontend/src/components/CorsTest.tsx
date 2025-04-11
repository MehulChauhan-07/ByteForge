import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const CorsTest: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runCorsTests = async () => {
    setLoading(true);
    setResults([]);
    const testResults = [];

    // Test 1: Simple GET request
    try {
      const response = await axios.get(`${API_URL}/test/ping`, {
        headers: { 'Content-Type': 'application/json' }
      });
      testResults.push({
        name: 'GET Request',
        status: 'Success',
        statusCode: response.status,
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        name: 'GET Request',
        status: 'Error',
        statusCode: error.response?.status || 'Network Error',
        message: error.message
      });
    }

    // Test 2: POST request with JSON body
    try {
      const response = await axios.post(`${API_URL}/test/cors-test`, 
        { test: 'data', timestamp: new Date().toISOString() },
        { headers: { 'Content-Type': 'application/json' }}
      );
      testResults.push({
        name: 'POST Request with JSON',
        status: 'Success',
        statusCode: response.status,
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        name: 'POST Request with JSON',
        status: 'Error',
        statusCode: error.response?.status || 'Network Error',
        message: error.message
      });
    }

    // Test 3: Authenticated request
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/test/auth-test`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      testResults.push({
        name: 'Authenticated Request',
        status: 'Success',
        statusCode: response.status,
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        name: 'Authenticated Request',
        status: 'Error',
        statusCode: error.response?.status || 'Network Error',
        message: error.message
      });
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">CORS Test</h2>
      
      <button 
        onClick={runCorsTests}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Running Tests...' : 'Run CORS Tests'}
      </button>
      
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-3 rounded ${
                  result.status === 'Success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{result.name}</span>
                  <span className={`${
                    result.status === 'Success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.status} {result.statusCode ? `(${result.statusCode})` : ''}
                  </span>
                </div>
                
                {result.message && (
                  <div className="text-red-600 mt-2">{result.message}</div>
                )}
                
                {result.data && (
                  <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorsTest;
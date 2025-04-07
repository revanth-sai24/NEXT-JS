````jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

/**
 * Higher-Order Component for authentication
 * @param {React.Component} WrappedComponent - Component to wrap with authentication logic
 * @param {Object} options - Configuration options
 * @returns {React.Component} - Enhanced component with authentication
 */
export const withAuth = (WrappedComponent, options = {}) => {
  const { requireAuth = true, redirectPath = '/login' } = options;
  
  const WithAuthComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const isAuthenticated = await AuthService.isAuthenticated();
          setAuthenticated(isAuthenticated);
          
          if (requireAuth && !isAuthenticated) {
            navigate(redirectPath);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
        } finally {
          setLoading(false);
        }
      };
      
      checkAuth();
    }, [navigate]);
    
    if (loading) {
      return <div className="auth-loading">Checking authentication...</div>;
    }
    
    if (requireAuth && !authenticated) {
      return null; // Will redirect via useEffect
    }
    
    return <WrappedComponent {...props} authenticated={authenticated} />;
  };
  
  return WithAuthComponent;
};
````
````jsx
export class AuthService {
  static isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return Promise.resolve(!!token);
  }
  
  static async login(email, password) {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('auth_token', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  static logout() {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  }
}
````
```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { withAuth } from '../../hoc/withAuth';
import './Login.css';

const LoginComponent = ({ authenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  if (authenticated) {
    navigate('/dashboard');
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await AuthService.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
          <p><a href="/forgot-password">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

// Use withAuth HOC with Login component, but don't require auth
export const Login = withAuth(LoginComponent, { requireAuth: false });
````
````jsx
import React from 'react';
import { withAuth } from '../hoc/withAuth';

const ProtectedRouteComponent = ({ children }) => {
  return children;
};

// This component will redirect to /login if user is not authenticated
export const ProtectedRoute = withAuth(ProtectedRouteComponent);
````
```jsx
// Example usage in your routes
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
</Routes>
````

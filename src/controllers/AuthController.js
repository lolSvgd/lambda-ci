import { useState } from 'react';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

export const useAuthController = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(TokenService.hasToken());

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await AuthService.login(email, password);
      TokenService.setToken(response.access_token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    setError('');
    
    try {
      await AuthService.register(username, email, password);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    TokenService.removeToken();
    setIsAuthenticated(false);
  };

  return {
    loading,
    error,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
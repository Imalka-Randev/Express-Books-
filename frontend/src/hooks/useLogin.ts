import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { loginSuccess } from '../store/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });

      dispatch(loginSuccess({
        user: response.data.user,
        token: response.data.token
      }));

      // Navigate to the dashboard after successful login
      navigate('/');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    showPassword,
    setShowPassword,
    handleSubmit
  };
};

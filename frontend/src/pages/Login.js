import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link for navigation
import { toast } from 'react-toastify';
import api from '../api/api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error('Both email and password are required.');
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        toast.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Container
      sx={{
        marginTop: { xs: 4, sm: 6 },
        maxWidth: { xs: '100%', sm: 400 },
        padding: { xs: 2, sm: 4 },
        boxShadow: 2,
        borderRadius: 3,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginBottom: 3 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Not registered yet? <Link to="/register">Sign up here</Link>.
      </Typography>
    </Container>
  );
};

export default Login;

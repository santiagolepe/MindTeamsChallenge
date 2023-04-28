import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../slices/alertSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(email, password)); 
      navigate('/profile');
    } catch (error) {
      console.error('Login:', error);
      dispatch(showAlert({ message: 'Error during login. Please check your email and password.', variant: "danger" }));
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        
      </Form>
    </Container>
  );
};

export default Login;

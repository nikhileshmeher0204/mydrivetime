import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function onFinish(e) {
    e.preventDefault();
    dispatch(userLogin(formData));
  }

  return (
    <Container fluid className="login-container py-5" style={{ 
      minHeight: '100vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {loading && <Spinner />}
      <Row className="justify-content-md-center">
        <Col md={5}>
          <div className="login-form p-4" style={{
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff'
          }}>
            <h1 className="text-center mb-4">Login</h1>
            <Form onSubmit={onFinish}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={{ color: '#fff' }}>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label style={{ color: '#fff' }}>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 mb-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link 
                to="/register" 
                style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Don't have an account? Register here
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
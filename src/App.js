// Import necessary libraries and styles
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Functional component for the login form
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: email,
        password: password,
      });

      const { status, message } = response.data;
      if (status === "success1") {
        alert(message);
        navigate('/main');
      } else if (status === "success") {
        alert(message);
        navigate('/dash');
      } else {
        alert(message);
        navigate('/');
        resetFields();
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-dark" style={{ minHeight: '100vh', padding: '40px' }}> 
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card "  style={{ backgroundColor: '#f5f5dc'}}>
            <div className="card-header ">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f2f2f2'}}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Username:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div><br></br>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
}

export default App;

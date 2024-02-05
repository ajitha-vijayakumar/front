import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8000/${mode.toLowerCase()}`;
console.log('Request URL:', url);

const response = await axios.post(url, {
  username: email,
  password: password,
});

      
      const { status, message } = response.data;
      if (status === 'success1') {
        alert(message);
        navigate('/main');
      } else if (status === 'success') {
        alert(message);
        navigate('/dash');
      } else if (status === 'signupSuccess') {
        alert(message);
        // Redirect to the login page after successful signup
        setMode('login');
      } else {
        alert(message);
        resetFields();
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
    }
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    resetFields();
  };

  return (
    <div className="bg-dark" style={{ minHeight: '100vh', padding: '40px' }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#f5f5dc' }}>
              <div className="card-header ">
                <h3 className="text-center">{mode === 'login' ? 'Login' : 'Signup'}</h3>
              </div>
              <div className="card-body" style={{ backgroundColor: '#f2f2f2' }}>
                {mode === 'login' ? (
                  // Render login form
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
                        required
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
                        required
                      /><br></br>
                    </div>
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                ) : (
                  // Render signup form
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
                        required
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
                        required
                      />
                    </div><br></br>
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-primary">
                        Signup
                      </button>
                    </div>
                  </form>
                )}
                <div className="form-group text-center">
                  <button type="button" className="btn btn-link" onClick={toggleMode}>
                    {mode === 'login' ? 'New user ? Switch to Signup' : 'Already an user ? Switch to Login'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

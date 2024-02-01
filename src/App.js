import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 


function App() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate(); 
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission
    // sending data to node
    const response = await axios.post('http://localhost:8000/login', {
      username: email,
      password: password,
    });

    // response from node
    const {status,message} = response.data;
    if(status==="success")
    {
      alert(message);
      navigate('/main');
    }
    else
    {
      alert(message);
      navigate('/dash');
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange= { (e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange= { (e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default App;

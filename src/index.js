import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Main from './main'; // Assuming you have a Main component for '/main'
import Dash from './dash'; 

const App2 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App2 />, document.getElementById('root'));


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dash(){
    const [tableData, setTableData] = useState([]);  
    const [id, setId] = useState('');
    const [bookName, setbookName] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (searchQuery.trim() !== '') {
        performRealTimeSearch();
      } else {
         fetchTableData();
      }
    }, [searchQuery]);
    
  const performRealTimeSearch = async () => {
    const response = await axios.post('http://127.0.0.1:8000/realTimeSearch', {
      query: searchQuery,
    });

    const searchData = response.data;
    setTableData(searchData);
  };

    const fetchTableData = async () => {
        const response = await axios.post('http://127.0.0.1:8000/tableData');
        const data = response.data;
        setTableData(data);
    };
   
  
    const resetFields = () => {
        setbookName('');
        setAuthor('');
        setDescription('');
        setCategory('');
      };
    
    return(
      <div> 
     <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
            <form className="form-inline" >
            <div className="input-group">
            <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: '300px' }}  
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>
          </form>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
              <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
      
      <div className="row">
        {tableData.map((row, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body" style={{ height: '200px' }}>
                <h5 className="card-title">{row.bookName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{row.author}</h6>
                <p className="card-text">{row.description}</p>
                <p className="card-text">{row.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div></div></div>
    );
}
export default Dash;
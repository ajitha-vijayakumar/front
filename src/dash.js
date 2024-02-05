import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryDashboard({ categories, handleView }) {
  // Create an object to track unique categories
  const uniqueCategories = {};

  // Filter out duplicates and populate the uniqueCategories object
  const uniqueCategoriesArray = categories.filter(category => {
    if (!uniqueCategories[category]) {
      uniqueCategories[category] = true;
      return true;
    }
    return false;
  });
 
  return (
    <div className="container mt-4">
      <h2>Categories</h2>
      <div className="row">
        {uniqueCategoriesArray.map((category, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}onClick={() => handleView(category)}>
              <div className="card-body">
                <h5 className="card-title">{category}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dash() {
  const [tableData, setTableData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 const [viewModal, setViewModal] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryBooks, setCategoryBooks] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      performRealTimeSearch();
    } else {
      fetchTableData();
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array to fetch categories only once when the component mounts

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/categories');
      const categoriesData = response.data;
  
      console.log('Categories Data:', categoriesData); // Add this line for debugging
  
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  const performRealTimeSearch = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/realTimeSearch', {
        query: searchQuery,
      });

      const searchData = response.data;
      setTableData(searchData);
    } catch (error) {
      console.error('Error performing real-time search:', error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/tableData');
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };
  const handleView = (category) => {
    (async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/booksByCategory', {
          category: category,
        });
        const categoryBooksData = response.data;
        setSelectedCategory(category);
        setCategoryBooks(categoryBooksData);
        setViewModal(true);
      } catch (error) {
        console.error('Error fetching books by category:', error);
      }
    })();
  };
  
  
  return (
    <div>
  {viewModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`Books in ${selectedCategory} Category`}</h5>
                <button type="button" className="close" onClick={() =>setViewModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {categoryBooks.map((book, index) => (
                  <div key={index}>
                    <h6>{`Book ${index + 1}`}</h6>
                    <p>{`Book Name: ${book.bookName}`}</p>
                    <p>{`Author: ${book.author}`}</p>
                    <p>{`Description: ${book.description}`}</p>
                    <hr />
                  </div>
                ))}
                 </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
      </div>
      <CategoryDashboard categories={categories} handleView={handleView}/>
     
    </div>
  );
}

export default Dash;

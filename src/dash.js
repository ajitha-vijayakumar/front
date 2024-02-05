import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

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
                <h5 className="card-title">{category.toUpperCase()}</h5>
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
  const [showModal, setShowModal] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage =5;  // Set the number of books to display per page
  const [id, setId] = useState('');
    const [bookName, setbookName] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
  
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      performRealTimeSearch();
    } else {
      fetchTableData();
    }
  }, [searchQuery, currentPage]);

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
  const resetFields = () => {
    setbookName('');
    setAuthor('');
    setDescription('');
    setCategory('');
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
  const handleShow = (book) => {
    setId(book._id);
    setbookName(book.bookName);
    setAuthor(book.author);
    setDescription(book.description);
    setCategory(book.category);
    setShowModal(true);
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
   // Logic to get current books based on currentPage
   const indexOfLastBook = currentPage * booksPerPage;
   const indexOfFirstBook = indexOfLastBook - booksPerPage;
   const currentBooks = tableData.slice(indexOfFirstBook, indexOfLastBook);
 
   const totalBooks = tableData.length;
   // Render pagination component
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
   
  
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
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Book Details</h5>
                <button type="button" className="close" onClick={() =>{setShowModal(false); resetFields();}}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
              
                <form >

                <div className="form-group py-4">
                  <label htmlFor="bookName">Book Title</label>
                  <input type="text" className="form-control" id="bookName" aria-describedby="bookName" placeholder="Enter Book Title" value={bookName}
                          onChange={(e) => setbookName(e.target.value)} required readOnly/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="author">Author</label>
                  <input type="text" className="form-control" id="author" aria-describedby="author" placeholder="Enter Author Name" value={author}
                          onChange={(e) => setAuthor(e.target.value)} required readOnly/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description about the Book" value={description}
                          onChange={(e) => setDescription(e.target.value)} required readOnly/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="category">Category</label>
                  <input type="text" className="form-control" id="category" aria-describedby="category" placeholder="Enter the Category" value={category}
                          onChange={(e) => setCategory(e.target.value)} required readOnly/>
                </div>
                  </form>
                  <button type="button" className="submit" onClick={() =>{setShowModal(false); resetFields();}}>Close</button>
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
      <div className="container mt-4">
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((row, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{row.bookName}</td>
                <td>{row.author}</td>
                <td>{row.category}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleShow(row)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination>
            {Array.from({ length: Math.ceil(totalBooks / booksPerPage) }, (_, index) => (
              <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
          </div>
    </div>
  );
}

export default Dash;

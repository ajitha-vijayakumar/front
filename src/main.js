import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Main(){
    const [tableData, setTableData] = useState([]);  
    const [id, setId] = useState('');
    const [bookName, setbookName] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [editModal, setEditModal] = useState(false); 
    useEffect(() => {
        fetchTableData();
      }, []);
    
    const fetchTableData = async () => {
        const response = await axios.post('http://127.0.0.1:8000/tableData');
        const data = response.data;
        setTableData(data);
    };
    const deleteBook = async (bookId) => {
        const response = await axios.delete(`http://127.0.0.1:8000/deleteBook/${bookId}`);
        fetchTableData();
    
        const {status,message} = response.data;
        if(status==="success")
        {
          alert(message);
          fetchTableData();
        }
        else
        {
        alert('Error deleting book data');
        }
    
    };
    const handleAddBook = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/addBook', {
          bookName : bookName,
          author:author,
          description :description,
          category:category
        });
    
        const {status} = response.data;
        if(status==="success")
        {
          alert('User added successfully');
          fetchTableData();
          setShowModal(false);
          resetFields();
        }
        else
        {
        alert('Error adding user data');
        }
    };
    const resetFields = () => {
        setEmail('');
        setPassword('');
      };
      const handleEdit = (user) => {
        setId(user._id);
        setEmail(user.username);
        setPassword(user.password);
        setEditModal(true);
      };
      const handleEditUser = async () => {
        const response = await axios.post('http://127.0.0.1:8000/editUser', {
          id: id,
          username: email,
          password: password,
        });
        console.log('User edited successfully:', response.data);
        setEditModal(false);
        alert("Successfully edited");
        fetchTableData();
    };
        
    return(
        <div> 
        <h2>Welcome</h2><br/>
         
        {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Book</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
              
                <form onSubmit={handleAddBook}>

                <div className="form-group py-4">
                  <label htmlFor="bookName">Book Title</label>
                  <input type="text" className="form-control" id="bookName" aria-describedby="bookName" placeholder="Enter Book Title" value={bookName}
                          onChange={(e) => setbookName(e.target.value)}/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="author">Author</label>
                  <input type="text" className="form-control" id="author" aria-describedby="author" placeholder="Enter Author Name" value={author}
                          onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description about the Book" value={description}
                          onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="category">Category</label>
                  <input type="text" className="form-control" id="category" aria-describedby="category" placeholder="Enter the Category" value={category}
                          onChange={(e) => setCategory(e.target.value)}/>
                </div>
                
                  <button type="submit" className="btn btn-primary">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
{editModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="close" onClick={() => setEditModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
              
                <form onSubmit={handleEditUser}>

                <div className="form-group py-4">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email}
                          onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group py-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password}
                          onChange={(e) => setPassword(e.target.value)}/>
                </div> 
                  <button type="submit" className="btn btn-primary">Edit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    <button type="button" className="btn btn-success" onClick={() => setShowModal(true)}>Add Book</button> 
        <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.bookName}</td>
                    <td>{row.author}</td> 
                    <td>{row.category}</td> 
                    <td>{<button type="button" className="btn btn-danger" onClick={() => deleteBook(row._id)}>Delete</button>}
                        { <button type="button" className="btn btn-success" onClick={() => handleEdit(row)}>Edit</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
    );
}
export default Main;
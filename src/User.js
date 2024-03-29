// User.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './User.css';

function User() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    publishDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5003/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message); // Assuming server sends back a message
      // Optionally, you can reset the form after successful submission
      event.target.reset();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Failed to add book');
    }
  };
  
  return (
    <div className="user-container">
      <div className="form-container">
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="publishDate">Publish Date:</label>
            <input
              type="text"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              pattern="\d{4}-\d{2}-\d{2}"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Link to="/books" className="link-to-books">View Books</Link>
    </div>
  );
}

export default User;

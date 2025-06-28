import React, { useState } from 'react';
import axios from 'axios';

function UrlForm({ onRegistered }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileno: '',
    githubUsername: '',
    rollNo: '',
    accessCode: ''
  });
  const [error, setError] = useState(null);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/api/register', formData);
      onRegistered(res.data); 
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {['email', 'name', 'mobileno', 'githubUsername', 'rollNo', 'accessCode'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default UrlForm;

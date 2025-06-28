import React, { useState } from 'react';
import axios from 'axios';

function UrlList({ clientID, clientSecret, onLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
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
      const res = await axios.post('/api/auth', {
        ...formData,
        clientID,
        clientSecret
      });
      onLoggedIn(res.data.access_token); 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {['email', 'name', 'rollNo', 'accessCode'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Get Token</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default UrlList;

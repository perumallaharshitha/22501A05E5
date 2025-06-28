import React, { useState } from 'react';
import axios from 'axios';

function UrlStates({ token }) {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/api/url/shorten', { longUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Shortening failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shorten URL</h2>
      <input
        type="url"
        name="longUrl"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <button type="submit">Shorten</button>
      {shortUrl && <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default UrlStates;

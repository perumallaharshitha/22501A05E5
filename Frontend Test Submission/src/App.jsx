import React, { useState } from 'react';
import UrlForm from './files/UrlForm';
import UrlList from './files/UrlList';
import UrlStates from './files/UrlStates';
import './App.css';

function App() {
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <h1 className="main-heading">URL Shortener App</h1>
      {!client ? (
        <UrlForm onRegistered={setClient} />
      ) : !token ? (
        <UrlList
          clientID={client.clientID}
          clientSecret={client.clientSecret}
          onLoggedIn={setToken}
        />
      ) : (
        <UrlStates token={token} />
      )}
    </div>
  );
}
export default App;

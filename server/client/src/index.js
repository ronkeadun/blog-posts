import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/app.css';
import UserProvider from './contexts/UserContext';
import PostProvider from './contexts/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </React.StrictMode>
);

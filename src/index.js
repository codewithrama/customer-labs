// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'; // Update the import path

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

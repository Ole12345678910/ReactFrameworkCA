import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom';  // Import the Router here
import App from './App';
import './styles/index.css'; // Import the CSS file

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root element
root.render(
  <Router>  {/* Wrap your App component with Router */}
    <App />
  </Router>
);

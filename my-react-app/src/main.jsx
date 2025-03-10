import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import App from "./App";
import "./styles/index.css"; // Import global styles

// Create the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Ensure you have an element with id='root' in your HTML.");
}

// Create the root
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// hooks/useAPI.js
import { useState, useEffect } from "react";

// API URL to fetch products
const API_URL = "https://v2.api.noroff.dev/online-shop";

export const useAPI = () => {
  // State variables for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(API_URL);
        
        // If response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        // Parse the response data and set the products
        const data = await response.json();
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        // If an error occurs, set the error state
        setError(error.message);
        setLoading(false);
      }
    };

    // Call the fetch function when the component mounts
    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once

  // Return the state values so they can be used in components
  return { products, loading, error };
};

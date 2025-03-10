// hooks/useProduct.js
import { useState, useEffect } from "react";

// API URL to fetch a single product based on its ID
const API_URL = "https://v2.api.noroff.dev/online-shop";

export const useProduct = (id) => {
  // State variables to store the product, loading status, and errors
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetch product details when the ID changes or the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch data for a specific product based on the product ID
        const response = await fetch(`${API_URL}/${id}`);
        
        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        
        // Parse the response data and set the product state
        const json = await response.json();
        setProduct(json.data); 
      } catch (error) {
        // If an error occurs, set the error state
        setError(error.message);
      } finally {
        // Once fetching is done (success or failure), set loading to false
        setLoading(false);
      }
    };

    // Call the fetch function whenever the product ID changes
    fetchProduct();
  }, [id]); 

  // Return the product data, loading status, and error so they can be used in the component
  return { product, loading, error };
};

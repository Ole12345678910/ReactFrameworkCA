import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://v2.api.noroff.dev/online-shop";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const [product, setProduct] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const json = await response.json();
        setProduct(json.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="loading-text">Loading product details...</p>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.title}</h1>
      <div className="product-details-content">
        <img
          src={product.image?.url}
          alt={product.image?.alt || "Product image"}
        />
        <div>
          <p>{product.description}</p>
          <p className="price">
            ${product.discountedPrice} <s>${product.price}</s>
          </p>
          <p className="rating">Rating: ⭐ {product.rating}</p>

          {/* Add to Cart Button */}
          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

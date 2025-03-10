import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct"; // Import the custom hook

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();  // Get product ID from URL
  const { product, loading, error } = useProduct(id);  // Use the custom hook to fetch the product

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error fetching product details: {error}</p>;

  return (
    <div className="product-details-container">
      <h1>{product.title}</h1>
      <div className="product-details-content">
        <img
          src={product.image?.url}
          alt={product.image?.alt || "Product image"}
          className="product-image"
        />
        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="price">
            <span className="discounted-price">${product.discountedPrice.toFixed(2)}</span>
            {product.price !== product.discountedPrice && (
              <>
                {" "}
                <s className="original-price">${product.price.toFixed(2)}</s>
              </>
            )}
          </p>
          <p className="rating">⭐ {product.rating} / 5</p>

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

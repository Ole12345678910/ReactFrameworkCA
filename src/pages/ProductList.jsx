import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ data, addToCart }) {
  if (!data || data.length === 0) {
    return <p className="empty-message">No products available.</p>;
  }

  return (
    <div className="product-list">
      {data.map((product) => {
        // Calculate discount
        const discount = product.price - product.discountedPrice;
        const discountPercentage = ((discount / product.price) * 100).toFixed(0);

        return (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img
                src={product.image?.url}
                alt={product.image?.alt || product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>

              {/* Display pricing information */}
              <p className="price">
                {discount > 0 ? (
                  <>
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="discounted-price"> ${product.discountedPrice.toFixed(2)}</span>
                    <span className="discount-badge">-{discountPercentage}%</span>
                  </>
                ) : (
                  <span>${product.discountedPrice.toFixed(2)}</span>
                )}
              </p>
            </Link>

            {/* Add to Cart button */}
            <button className="add-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;

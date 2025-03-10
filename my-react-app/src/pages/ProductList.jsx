import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ data, addToCart }) {
  return (
    <div className="product-list">
      {data.map((product) => {
        // Calculate discount
        const discount = product.price - product.discountedPrice;
        const discountPercentage = ((discount / product.price) * 100).toFixed(0);

        return (
          <div key={product.id} className="product-card">
            {/* Wrap the entire card inside the Link */}
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image.url} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>

              {/* Display pricing information */}
              {discount > 0 ? (
                <p>
                  <span className="original-price">${product.price}</span>
                  <span className="discounted-price"> ${product.discountedPrice}</span>
                  <span className="discount-badge">-{discountPercentage}%</span>
                </p>
              ) : (
                <p className="price">${product.discountedPrice}</p>
              )}
            </Link>

            {/* Add to Cart button */}
            <button className='add-cart-btn' onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import trash icon

function EditOrderPage({ cart, setCart }) {
  const navigate = useNavigate();
  const [updatedCart, setUpdatedCart] = useState([...cart]);

  // Sync with the original cart if it changes
  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setUpdatedCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (removes if 0)
  const decreaseQuantity = (id) => {
    setUpdatedCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // Remove product completely
  const removeProduct = (id) => {
    setUpdatedCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Save changes to main cart
  const saveChanges = () => {
    setCart(updatedCart);
    navigate("/cart"); // Go back to cart page after saving
  };

  // Calculate total price
  const total = updatedCart.reduce(
    (sum, product) => sum + product.discountedPrice * product.quantity,
    0
  );

  return (
    <div className="edit-order-page">
      <h2>Edit Your Order</h2>
      {updatedCart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {updatedCart.map((item) => {
            const discount = item.price - item.discountedPrice;
            const discountPercentage = ((discount / item.price) * 100).toFixed(0);

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image.url} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  
                  {/* Show original price, discounted price, and discount percentage if applicable */}
                  {discount > 0 ? (
                    <p className="price">
                      <span className="original-price">${item.price.toFixed(2)}</span>
                      <span className="discounted-price"> ${item.discountedPrice.toFixed(2)}</span>
                      <span className="discount-badge">-{discountPercentage}%</span>
                    </p>
                  ) : (
                    <p className="price">${item.discountedPrice.toFixed(2)}</p>
                  )}

                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.id)} className="qty-btn">-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="qty-btn">+</button>
                    <button onClick={() => removeProduct(item.id)} className="remove-btn">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {updatedCart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="save-btn" onClick={saveChanges}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default EditOrderPage;

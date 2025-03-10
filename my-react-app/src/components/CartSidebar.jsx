import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon
import { Link } from 'react-router-dom'; // Import Link for navigation

function CartSidebar({ cart, setCart, isOpen, toggleCart }) {
  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // Remove item completely and update localStorage
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  // Function to handle the checkout click and close the cart
  const handleCheckoutClick = () => {
    toggleCart(); // Close the cart sidebar
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={toggleCart}>×</button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => {
            const discount = item.price - item.discountedPrice;
            const discountPercentage = ((discount / item.price) * 100).toFixed(0);

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image.url} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h4>{item.title}</h4>
                  
                  {/* Show original price, discounted price, and discount percentage if applicable */}
                  {discount > 0 ? (
                    <p>
                      <span className="original-price">${item.price}</span>
                      <span className="discounted-price"> ${item.discountedPrice}</span>
                      <span className="discount-badge">-{discountPercentage}%</span>
                    </p>
                  ) : (
                    <p className="price">${item.discountedPrice}</p>
                  )}
                  
                  {/* Show total price for item (unit price * quantity) */}
                  <p>Total: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>

                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Total Price and Checkout Button (Only Show If Cart is Not Empty) */}
      {cart.length > 0 && (
        <div className="cart-total">
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <Link to="/cart">
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;

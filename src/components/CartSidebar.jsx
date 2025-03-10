import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon for item removal
import { Link } from 'react-router-dom'; // Import Link for navigation between pages

function CartSidebar({ cart, setCart, isOpen, toggleCart }) {
  // Increase quantity of a specific item in the cart
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item // If id matches, increase quantity
      )
    );
    // Optionally, update localStorage here too after state change
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Decrease quantity of a specific item in the cart
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item // If id matches, decrease quantity
        )
        .filter((item) => item.quantity > 0) // Filter out items with quantity 0
    );
    // Optionally, update localStorage here too after state change
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Remove a specific item from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id); // Remove item with matching id
    setCart(updatedCart); // Update cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity, // Sum up the total based on discountedPrice and quantity
    0
  );

  // Function to handle the checkout button click and close the cart
  const handleCheckoutClick = () => {
    toggleCart(); // Close the cart sidebar after proceeding to checkout
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}> {/* Conditional className for cart sidebar */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={toggleCart}>×</button> {/* Close button */}
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p> // Message when cart is empty
        ) : (
          // Loop through each item in the cart and display it
          cart.map((item) => {
            const discount = item.price - item.discountedPrice; // Calculate the discount amount
            const discountPercentage = ((discount / item.price) * 100).toFixed(0); // Calculate the discount percentage

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image.url} alt={item.title} className="cart-img" /> {/* Item image */}
                <div className="cart-info">
                  <h4>{item.title}</h4> {/* Item title */}

                  {/* If there's a discount, display original price, discounted price, and discount percentage */}
                  {discount > 0 ? (
                    <p>
                      <span className="original-price">${item.price}</span> {/* Original price */}
                      <span className="discounted-price"> ${item.discountedPrice}</span> {/* Discounted price */}
                      <span className="discount-badge">-{discountPercentage}%</span> {/* Discount badge */}
                    </p>
                  ) : (
                    <p className="price">${item.discountedPrice}</p> // No discount, just show discounted price
                  )}
                  
                  {/* Display total price for the item (unit price * quantity) */}
                  <p>Total: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>

                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button> {/* Decrease quantity */}
                    <span>{item.quantity}</span> {/* Display current quantity */}
                    <button onClick={() => increaseQuantity(item.id)}>+</button> {/* Increase quantity */}
                    <button onClick={() => removeItem(item.id)} className="remove-btn">
                      <FaTrash /> {/* Trash icon to remove item */}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Show total price and Checkout button if the cart is not empty */}
      {cart.length > 0 && (
        <div className="cart-total">
          <p>Total: ${totalPrice.toFixed(2)}</p> {/* Display total price */}
          <Link to="/cart"> {/* Link to the Cart page */}
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;

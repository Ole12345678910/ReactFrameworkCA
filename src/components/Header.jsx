import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation between pages

// Header component that includes navigation and a cart button
function Header({ cart, toggleCart }) {
  return (
    <header>
      <nav>
        <ul>
          {/* Home link to the homepage */}
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Contact Us link to the contact page */}
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>

          {/* Cart button displaying the total number of items in the cart */}
          <li>
            <button className="cart-button" onClick={toggleCart}>
              🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)}) {/* Calculate total items in cart */}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

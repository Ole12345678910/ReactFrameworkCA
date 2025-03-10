import React from "react";
import { Link } from "react-router-dom";

function Header({ cart, toggleCart }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/contact">Contact Us</Link> {/* Link to the Contact Page */}
          </li>
          <li>
            <button className="cart-button" onClick={toggleCart}>
              🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

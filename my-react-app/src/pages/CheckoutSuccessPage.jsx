import React from "react";
import { Link } from "react-router-dom";

function CheckoutSuccessPage() {
  return (
    <div className="checkout-success">
      <div className="success-message">
        <h2>🎉 Thank You for Your Purchase! 🎉</h2>
        <p>Your order has been successfully placed. A confirmation email will be sent shortly.</p>
        <p>We appreciate your business and hope you enjoy your purchase! 😊</p>
        <Link to="/" className="back-to-store-button">Back to Store</Link>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;

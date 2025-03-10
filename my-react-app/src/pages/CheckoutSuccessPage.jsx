import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
  return (
    <div className="checkout-success">
      <h2>Thank you for your purchase!</h2>
      <Link to="/">Go back to store</Link> {/* Link to go back to the store */}
    </div>
  );
}

export default CheckoutSuccessPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutFormPage({ cart, handleCheckout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    sameAddress: true,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value.trim(),
    }));
  };

  const validationRules = {
    fullName: { condition: (value) => value.length >= 3, message: "Full name must be at least 3 characters" },
    email: { condition: (value) => /\S+@\S+\.\S+/.test(value), message: "Invalid email address" },
    address: { condition: (value) => value.length >= 5, message: "Address must be at least 5 characters" },
    city: { condition: (value) => value.length >= 2, message: "City must be valid" },
    state: { condition: (value) => value.length >= 2, message: "State must be valid" },
    zip: { condition: (value) => /^\d{5}$/.test(value), message: "ZIP code must be 5 digits" },
    cardNumber: { condition: (value) => /^\d{16}$/.test(value), message: "Card number must be 16 digits" },
    expMonth: { condition: (value) => /^(0[1-9]|1[0-2])$/.test(value), message: "Enter a valid month (01-12)" },
    expYear: { condition: (value) => /^\d{4}$/.test(value), message: "Enter a valid 4-digit year" },
    cvv: { condition: (value) => /^\d{3}$/.test(value), message: "CVV must be 3 digits" },
  };

  const validateForm = () => {
    const newErrors = Object.entries(validationRules).reduce((acc, [field, { condition, message }]) => {
      if (!condition(formData[field])) acc[field] = message;
      return acc;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Checkout details:", formData);

      localStorage.removeItem("cart"); // Clear cart from localStorage
      handleCheckout(); // Reset cart state

      navigate("/checkout-success"); // Navigate to success page
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-container">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>Billing Address</h3>
            {["fullName", "email", "address", "city"].map((field) => (
              <div key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <input type="text" name={field} value={formData[field]} onChange={handleInputChange} required />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
            <div className="row">
              {["state", "zip"].map((field) => (
                <div key={field} className="col-50">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input type="text" name={field} value={formData[field]} onChange={handleInputChange} required />
                  {errors[field] && <p className="error">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <h3>Payment</h3>
            {["cardName", "cardNumber"].map((field) => (
              <div key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <input type="text" name={field} value={formData[field]} onChange={handleInputChange} required />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
            <div className="row">
              {["expMonth", "expYear", "cvv"].map((field, index) => (
                <div key={field} className={index === 2 ? "col-50" : "col-33"}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input type="text" name={field} value={formData[field]} onChange={handleInputChange} required />
                  {errors[field] && <p className="error">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="checkout-button">Complete Purchase</button>
        </form>
      </div>

      <div className="cart-summary">
        <h4>Cart Summary</h4>
        {cart.map((item, index) => {
          const savedPerItem = item.price - item.discountedPrice;
          const discountPercentage = ((savedPerItem / item.price) * 100).toFixed(0);

          return (
            <p key={index}>
              {item.title} <span></span>
              <span className="original-price">${item.price.toFixed(2)}</span> →  
              <span className="discounted-price"> ${item.discountedPrice.toFixed(2)}</span>  
              <span className="discount-badge">-{discountPercentage}%</span>
            </p>
          );
        })}
        <hr />
        <p><strong>Total Items:</strong> {cart.reduce((total, item) => total + item.quantity, 0)}</p>
        <p><strong>Original Price:</strong> ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <p><strong>Saved:</strong> <span className="total-saved">-${cart.reduce((total, item) => total + (item.price - item.discountedPrice) * item.quantity, 0).toFixed(2)}</span></p>
        <p><strong>Final Total:</strong> <span className="total-price">${cart.reduce((total, item) => total + item.discountedPrice * item.quantity, 0).toFixed(2)}</span></p>
      </div>
    </div>
  );
}

export default CheckoutFormPage;

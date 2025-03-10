import React, { useState, useEffect } from "react";
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
  const [hasReloaded, setHasReloaded] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function to be DRY
  const validationRules = {
    fullName: {
      condition: (value) => value.length >= 3,
      message: "Full name must be at least 3 characters",
    },
    email: {
      condition: (value) => value.includes("@"),
      message: "Invalid email address",
    },
    address: {
      condition: (value) => value.length >= 5,
      message: "Address must be at least 5 characters",
    },
    city: {
      condition: (value) => value.length >= 2,
      message: "City name must be valid",
    },
    state: {
      condition: (value) => value.length >= 2,
      message: "State must be valid",
    },
    zip: {
      condition: (value) => value.length >= 5,
      message: "Invalid ZIP code",
    },
    cardNumber: {
      condition: (value) => value.length === 16,
      message: "Card number must be 16 digits",
    },
    cvv: {
      condition: (value) => value.length === 3,
      message: "CVV must be 3 digits",
    },
  };

  const validateForm = () => {
    const newErrors = Object.keys(validationRules).reduce((acc, field) => {
      const { condition, message } = validationRules[field];
      if (!condition(formData[field])) {
        acc[field] = message;
      }
      return acc;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Checkout details:", formData);
      handleCheckout();
      window.location.reload();
    }
  };

  // After page reload, navigate to checkout success
  useEffect(() => {
    if (hasReloaded) {
      navigate("/checkout-success");
    }
  }, [hasReloaded, navigate]);

  // Calculate total items in cart
  const calculateTotalQuantity = (cart) => cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total original price (before discounts)
  const calculateOriginalTotalPrice = (cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate total discounted price
  const calculateTotalPrice = (cart) => cart.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);

  // Calculate total savings
  const calculateTotalSaved = (cart) => {
    return cart.reduce((total, item) => {
      const savedPerItem = (item.price - item.discountedPrice) * item.quantity;
      return total + savedPerItem;
    }, 0);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-container">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          {/* Billing Address */}
          <div className="form-section">
            <h3>Billing Address</h3>
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
            {errors.address && <p className="error">{errors.address}</p>}

            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
            {errors.city && <p className="error">{errors.city}</p>}

            <div className="row">
              <div className="col-50">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
              <div className="col-50">
                <label>ZIP</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required />
                {errors.zip && <p className="error">{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="form-section">
            <h3>Payment</h3>
            <label>Name on Card</label>
            <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} required />

            <label>Credit Card Number</label>
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

            <label>Exp Month</label>
            <input type="text" name="expMonth" value={formData.expMonth} onChange={handleInputChange} required />

            <div className="row">
              <div className="col-50">
                <label>Exp Year</label>
                <input type="text" name="expYear" value={formData.expYear} onChange={handleInputChange} required />
              </div>
              <div className="col-50">
                <label>CVV</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            </div>
          </div>

          <button type="submit" className="checkout-button">Complete Purchase</button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h4>Cart Summary</h4>

        {cart.map((item, index) => {
          const savedPerItem = item.price - item.discountedPrice;
          const discountPercentage = ((savedPerItem / item.price) * 100).toFixed(0);

          return (
            <p key={index}>
              {item.title} <span className="price">x{item.quantity} - </span>
              <span className="original-price">${item.price.toFixed(2)}</span> →  
              <span className="discounted-price"> ${item.discountedPrice.toFixed(2)}</span>  
              <span className="discount-badge">-{discountPercentage}%</span>
            </p>
          );
        })}

        <hr />
        <p><strong>Total Items:</strong> {calculateTotalQuantity(cart)}</p>
        <p><strong>Original Price:</strong> ${calculateOriginalTotalPrice(cart).toFixed(2)}</p>
        <p><strong>Saved:</strong> <span className="total-saved">-${calculateTotalSaved(cart).toFixed(2)}</span></p>
        <p><strong>Final Total:</strong> <span className="total-price">${calculateTotalPrice(cart).toFixed(2)}</span></p>
      </div>
    </div>
  );
}

export default CheckoutFormPage;

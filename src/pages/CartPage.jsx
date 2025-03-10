import React from "react";
import { useNavigate } from "react-router-dom";

// Helper function to calculate the discount and discount percentage
const calculateDiscount = (product) => {
  const discount = product.price - product.discountedPrice;
  const discountPercentage = ((discount / product.price) * 100).toFixed(0);
  return { discount, discountPercentage };
};

function CartPage({ cart }) {
  const navigate = useNavigate();

  // Group the cart items to combine duplicates (by id)
  const groupedCart = cart.reduce((acc, product) => {
    const existingItem = acc.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity; // Increase quantity if the product already exists in the cart
    } else {
      acc.push({ ...product }); // Add new product if not found
    }
    return acc;
  }, []);

  // Calculate total original price (without discount)
  const totalOriginal = groupedCart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Calculate total discounted price (with discount)
  const totalDiscounted = groupedCart.reduce(
    (sum, product) => sum + product.discountedPrice * product.quantity,
    0
  );

  // Calculate total amount saved
  const totalSaved = totalOriginal - totalDiscounted;

  return (
    <div className="cart-page">
      {/* Edit Order Button */}
      <button className="edit-order-btn" onClick={() => navigate("/edit-order")}>
        Edit Order
      </button>

      <h2>Your Cart</h2>
      
      {/* Empty Cart Check */}
      {groupedCart.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <button className="go-back-btn" onClick={() => navigate("/")}>
            Go Back to Shopping
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {/* Render grouped cart items */}
          {groupedCart.map((product) => {
            const { discount, discountPercentage } = calculateDiscount(product);

            // Basic error handling for missing image URL
            if (!product.image || !product.image.url) {
              return <p key={product.id}>Image not available</p>;
            }

            return (
              <div key={product.id} className="cart-item">
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="cart-img"
                />
                <div className="cart-info">
                  <h3>{product.title}</h3>

                  {/* Show original price, discounted price, and discount percentage */}
                  {discount > 0 ? (
                    <p>
                      <span className="original-price">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="discounted-price">
                        {" "}
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="discount-badge">
                        -{discountPercentage}%
                      </span>
                    </p>
                  ) : (
                    <p>
                      Price: <strong>${product.discountedPrice.toFixed(2)}</strong>
                    </p>
                  )}

                  {/* Display quantity and total price for the item */}
                  <p>Quantity: <strong>{product.quantity}</strong></p>
                  <p>
                    Total: <strong>${(product.discountedPrice * product.quantity).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Total and Total Saved */}
      <div className="cart-total">
        <h3 className="total-price">Total: ${totalDiscounted.toFixed(2)}</h3>
        <h4 className="total-saved">Saved: ${totalSaved.toFixed(2)}</h4>
        
        {/* Proceed to checkout button */}
        <button className="checkout-btn" onClick={() => navigate("/checkout-form")}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;

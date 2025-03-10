import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage({ cart }) {
  const navigate = useNavigate();

  // Group the cart items to combine duplicates (by id)
  const groupedCart = cart.reduce((acc, product) => {
    const existingItem = acc.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      acc.push({ ...product });
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
      <div className="cart-items">
        {groupedCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          groupedCart.map((product) => {
            const discount = product.price - product.discountedPrice;
            const discountPercentage = ((discount / product.price) * 100).toFixed(0);

            return (
              <div key={product.id} className="cart-item">
                <img src={product.image.url} alt={product.title} className="cart-img" />
                <div className="cart-info">
                  <h3>{product.title}</h3>

                  {/* Show original price, discounted price, and discount percentage */}
                  {discount > 0 ? (
                    <p>
                      <span className="original-price">${product.price.toFixed(2)}</span>
                      <span className="discounted-price"> ${product.discountedPrice.toFixed(2)}</span>
                      <span className="discount-badge">-{discountPercentage}%</span>
                    </p>
                  ) : (
                    <p>Price: <strong>${product.discountedPrice.toFixed(2)}</strong></p>
                  )}

                  <p>Quantity: <strong>{product.quantity}</strong></p>
                  <p>Total: <strong>${(product.discountedPrice * product.quantity).toFixed(2)}</strong></p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total and Total Saved */}
      <div className="cart-total">
        <h3 className="total-price">Total: ${totalDiscounted.toFixed(2)}</h3>
        <h4 className="total-saved">Saved: ${totalSaved.toFixed(2)}</h4>
        <button className="checkout-btn" onClick={() => navigate("/checkout-form")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;

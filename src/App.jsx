import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutFormPage from "./pages/CheckoutFormPage";
import EditOrderPage from "./pages/EditOrderPage";
import SearchBar from "./components/SearchBar";
import CartSidebar from "./components/CartSidebar";
import ContactPage from "./pages/ContactPage";

// Import the custom hook
import { useAPI } from "./hooks/useAPI";

function App() {
  const { products, loading, error } = useAPI(); // Use the custom hook to fetch products
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total cart price calculation
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.discountedPrice * product.quantity,
    0
  );

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Decrease quantity or remove product
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product completely
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Toggle cart visibility
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Handle checkout: clears the cart
  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    localStorage.removeItem("cart");
  };

  // Clear cart after successful order
  const handleOrderSuccess = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Layout cart={cart} toggleCart={toggleCart}>
            <div>
        <img src="/vite.svg" alt="Vite logo" style={{ width: '100px', height: 'auto' }} />
      </div>
      {location.pathname === "/" && <SearchBar onSearch={setSearchTerm} />}

      {/* Cart Sidebar (conditionally rendered) */}
      {isCartOpen && (
        <CartSidebar
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          toggleCart={toggleCart}
          removeFromCart={removeFromCart}
          decreaseQuantity={decreaseQuantity}
        />
      )}

      {/* Show loading state while products are loading */}
      {loading && <div>Loading products...</div>}
      {error && <div>Error loading products: {error}</div>}

      <Routes>
        <Route path="/" element={<ProductList data={filteredProducts} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} handleCheckout={handleCheckout} />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage onOrderSuccess={handleOrderSuccess} />} />
        <Route path="/checkout-form" element={<CheckoutFormPage cart={cart} total={totalPrice} handleCheckout={handleCheckout} />} />
        <Route path="/edit-order" element={<EditOrderPage cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

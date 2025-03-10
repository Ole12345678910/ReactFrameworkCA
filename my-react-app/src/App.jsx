// App.jsx
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

const API_URL = "https://v2.api.noroff.dev/online-shop";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Load cart from localStorage when the app starts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setProducts(json.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // Save cart to localStorage whenever cart is updated
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Decrease quantity of product in cart
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle checkout: clears the cart
  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    localStorage.removeItem("cart"); // Remove cart from localStorage after checkout
  };

  // Ensure CheckoutSuccessPage clears the cart
  const handleOrderSuccess = () => {
    setCart([]); // Resets cart after successful checkout
    localStorage.removeItem("cart"); // Clear cart from localStorage
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total cart price calculation (for clarity)
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.discountedPrice * product.quantity,
    0
  );

  return (
    <Layout cart={cart} toggleCart={toggleCart}>
      {location.pathname === "/" && <SearchBar onSearch={setSearchTerm} />}

      {/* Only show CartSidebar if isCartOpen is true */}
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

      <Routes>
        <Route
          path="/"
          element={<ProductList data={filteredProducts} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              setCart={setCart}
              handleCheckout={handleCheckout}
            />
          }
        />
        <Route
          path="/checkout-success"
          element={<CheckoutSuccessPage onOrderSuccess={handleOrderSuccess} />}
        />
        <Route
          path="/checkout-form"
          element={
            <CheckoutFormPage
              cart={cart}
              total={totalPrice}
              handleCheckout={handleCheckout}  // Pass handleCheckout to CheckoutFormPage
            />
          }
        />
        <Route
          path="/edit-order"
          element={<EditOrderPage cart={cart} setCart={setCart} />}
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

import React from "react";
import Header from "./Header"; // Importing the Header component
import Footer from "./Footer"; // Importing the Footer component

// Layout component that wraps the main content, header, and footer
const Layout = ({ children, cart, toggleCart }) => {
  return (
    <div className="layout">
      {/* The Header component receives cart and toggleCart as props */}
      <Header cart={cart} toggleCart={toggleCart} />

      {/* Main content area that displays the child components (pages) */}
      <main className="content">
        {children} {/* Dynamically render the content passed to the Layout */}
      </main>

      {/* The Footer component */}
      <Footer />
    </div>
  );
};

export default Layout;

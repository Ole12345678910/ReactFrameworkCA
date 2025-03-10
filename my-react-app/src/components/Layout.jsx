import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, cart, toggleCart }) => {
  return (
    <div className="layout">
      <Header cart={cart} toggleCart={toggleCart} />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

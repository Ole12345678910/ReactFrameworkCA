// Footer component that displays the footer content for the website
function Footer() {
  return (
    <footer>
      {/* Copyright statement for the footer */}
      <p>&copy; {new Date().getFullYear()} EcomStore. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

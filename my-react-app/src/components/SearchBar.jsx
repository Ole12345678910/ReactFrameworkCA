import React from 'react';

function SearchBar({ onSearch }) {
  // Handle the input change and pass the value to the parent component
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Pass the value back to the parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleInputChange} // Trigger onSearch when typing
      />
    </div>
  );
}

export default SearchBar;

import React from 'react';

function SearchBar({ onSearch }) {
  // Handle the input change and pass the value to the parent component
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Pass the value back to the parent component through the onSearch function
  };

  return (
    <div className="search-bar">
      <input
        type="text" // The input field where the user types their search query
        placeholder="Search products..." // Placeholder text for the input field
        onChange={handleInputChange} // Trigger the handleInputChange function whenever the user types
      />
    </div>
  );
}

export default SearchBar;

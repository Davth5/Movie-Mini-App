import React from "react";

function SearchBar({ setSearchTerm }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search for a Movie"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </form>
  );
}

export default SearchBar;

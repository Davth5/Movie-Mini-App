import React, { useState } from "react";

function AddMovie({ onAdd }) {
  const [newMovie, setNewMovie] = useState("");

  const addHandler = () => {
    if (newMovie) {
      onAdd(newMovie);
      setNewMovie("");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Add a new movie"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
      ></input>
      <button type="button" onClick={addHandler}>
        Add
      </button>
    </form>
  );
}

export default AddMovie;

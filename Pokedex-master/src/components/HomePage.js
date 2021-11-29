import React from "react";
import "../App.css";

const HomePage = () => {
  return (
    <div className="App-body">
      <p style={{ fontSize: "40px" }}>
        A mini-encyclopedia of Pokémon.
      </p>

      <p>
        <img
          alt="Show"
          style={{ marginTop: "20px" }}
          src="https://cdn.custom-cursor.com/collections/pokemon.png"
        />
      </p>
      <p
        style={{ wordWrap: "150px", marginLeft: "100px", marginRight: "100px" }}
      >
        Pokémon are creatures of all shapes and sizes who live in the wild or
        alongside humans. For the most part, Pokémon do not speak except to
        utter their names. There are currently more than 700 creatures that
        inhabit the Pokémon universe. Pokémon are raised and commanded by their
        owners (called “Trainers”). During their adventures, Pokémon grow, level
        up and become more experienced and even, on occasion, evolve into
        stronger Pokémon.
      </p>
      
    </div>
  );
};
export default HomePage;

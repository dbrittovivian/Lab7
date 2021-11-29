import React from "react";
import noImage from "../img/download.jpeg";

const PokeCard = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div
      className="card text-center mx-auto"
      style={{ maxWidth: "18rem" }}
      key={pokemon.id}
    >
      <div
        className="card-header text-center mx-auto card-title"
        style={{ maxHeight: "180px" }}
      >
        <b>{pokemon.name}</b>
      </div>
      <div className="card-body mx-auto" style={{ margin: "10px" }}>
        <img  alt="Show" width="300px" height="300px" src={pokemon.image || noImage} />
        <button type="button">Catch</button>
      </div>
    </div>
  );
};

export default PokeCard;

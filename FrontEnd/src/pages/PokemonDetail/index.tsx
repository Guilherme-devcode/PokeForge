import React from "react";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Pokemon from "../../shared/components/Pokemon/index";

function PokemonDetail() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="header-container p-3 point" onClick={handleGoBack}>
        <IoIosReturnLeft style={{ cursor: "pointer" }} size={40} />
      </div>
      <div id="container-fluid h-100">
        <Pokemon />
      </div>
    </>
  );
}

export default PokemonDetail;

import React from "react";
import { PokeBallLoaderStyle } from "./style";

export const PokeballLoader = () => {
  return (
    <>
      <PokeBallLoaderStyle.Container>
        <div className="ball"></div>
      </PokeBallLoaderStyle.Container>
    </>
  );
};

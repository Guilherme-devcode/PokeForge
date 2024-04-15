/* eslint-disable @typescript-eslint/no-namespace */
import styled from "styled-components";

export namespace MenuTeamStyle {
  export const Container = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    justify-content: center;
    background: red;
    border-top: 10px solid black;
    height: 7%;

    &.active-up {
      bottom: 0;
      animation: slideUp 0.5s forwards;
    }

    &.active-down {
      bottom: 0;
      animation: slideDown 0.5s forwards;
    }

    .menu-poke-ball {
      cursor: pointer;
      display: block;
      width: 192px;
      height: 192px;
      position: absolute;
      top: -101px;
      transform: scale(0.5);
      background: radial-gradient(
          white 16px,
          black 17px 18px,
          white 19px 24px,
          black 25px 32px,
          transparent 33px
        ),
        linear-gradient(to bottom, red 0 80px, black 81px 96px, white 97px 100%);
      border-radius: 50%;
      border: 8px solid black;
      box-shadow: inset -16px -8px 0 0 rgba(0, 0, 0, 0.2);
      animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1.5s 3,
        catch 0.5s ease-out 5.25s forwards;
    }

    @keyframes shake {
      0% {
        transform: translateX(0) rotate(0) scale(0.5);
      }
      20% {
        transform: translateX(-10px) rotate(-20deg) scale(0.5);
      }
      30% {
        transform: translateX(10px) rotate(20deg) scale(0.5);
      }
      50% {
        transform: translateX(-10px) rotate(-10deg) scale(0.5);
      }
      60% {
        transform: translateX(10px) rotate(10deg) scale(0.5);
      }
      100% {
        transform: translateX(0) rotate(0) scale(0.5);
      }
    }

    @keyframes slideUp {
      from {
        height: 7%;
      }
      to {
        height: 50%;
      }
    }

    @keyframes slideDown {
      from {
        height: 50%;
      }
      to {
        height: 7%;
      }
    }
  `;
}

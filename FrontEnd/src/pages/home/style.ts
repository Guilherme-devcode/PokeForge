/* eslint-disable @typescript-eslint/no-namespace */
import styled from "styled-components";

export namespace HomeStyle {
  export const Container = styled.div`
    width: 100%;
    .title {
      display: flex;
      justify-content: center;
      width: 100%;

      img {
        width: 150px;
        margin: 10px;
      }
    }
  `;
}

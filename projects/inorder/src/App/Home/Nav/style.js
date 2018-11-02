import { css } from "emotion";

export const Container = props => css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > header {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }

  > header > img {
    width: 30px;
    margin-right: 0.5rem;
  }
`;

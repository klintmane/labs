import { css } from "emotion";

export const Container = props => css`
  a {
    padding: 0.5rem;

    background: #eee;
    outline: none;
    border: none;
    border-radius: 0.25rem;

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    :hover {
      background: #f5f5f5;
    }
  }
`;

import { css } from "emotion";

export const Container = props => css`
  width: 100%;
  flex: 1 1;
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;

  > * {
    margin: 0 0.5rem;
  }
`;

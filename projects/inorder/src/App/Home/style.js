import { css } from "emotion";

export const Container = props => css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

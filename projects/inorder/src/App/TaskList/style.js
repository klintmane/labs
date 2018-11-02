import { css } from "emotion";

export const Container = props => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  box-sizing: border-box;

  padding: 2rem 1.5rem;

  border-radius: 0.5rem;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  overflow-y: auto;

  > header {
    > :first-child {
      align-items: center;
      display: flex;
    }

    small {
      display: block;
      font-size: 1rem;
      color: #ccc;
      padding: 1.5rem 0.5rem;
    }

    a {
      color: white;
    }

    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 2.5rem;
    border-bottom: 2px solid #ccc;
  }
`;

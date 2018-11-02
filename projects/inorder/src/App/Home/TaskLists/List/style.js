import { css } from "emotion";

export const Container = props => css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  box-sizing: border-box;

  flex: 0 0 200px;

  padding: 2rem 1.5rem;

  color: white;
  background: ${props.color};
  border-radius: 0.5rem;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  overflow-y: auto;

  > header {
    > a {
      color: white;
    }
    font-weight: bold;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }
`;

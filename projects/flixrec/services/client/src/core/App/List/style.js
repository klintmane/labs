import { css } from "emotion";

export const Container = ({ wrap }) => css`
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  display: flex;

  ${wrap
    ? css`
        flex-wrap: wrap;
        justify-content: space-between;

        > li {
          margin-bottom: 2rem;
        }

        > button {
          flex-basis: 100%;
        }
      `
    : css`
        > *:not(:last-child) {
          margin-right: 1.5rem;
        }
      `}

  overflow-x: auto;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 0.4rem;
  }

  button {
    color: #dc1a28;
    border: 2px solid #dc1a28;
    border-radius: 0.5rem;
    background: none;
    padding: 2rem;
    text-transform: uppercase;
    font-weight: 700;
    outline: none;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

export const Header = css`
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
`;

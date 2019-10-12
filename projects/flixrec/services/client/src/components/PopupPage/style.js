import { css } from "emotion";

export const Container = ({ transitioned, background = "white" }) => css`
  transition: top 0.2s;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${transitioned
    ? css`
        top: 0;
      `
    : css`
        top: 100%;
      `}

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 100;
  background: ${background};
`;

export const Header = css`
  position: sticky;
  top: 0;
  z-index: 101;
  height: 4rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > :nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin: 0 1rem;
  }

  background: #dc1a28;
  color: white;
  > * {
    color: white !important;
  }
`;

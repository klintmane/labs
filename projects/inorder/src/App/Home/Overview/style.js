import { css } from "emotion";

export const Container = ({ editing = false }) => css`
  padding: 2rem 0;
  font-size: 2.5rem;
  font-family: "Raleway", sans-serif;

  text-align: center;

  small {
    font-size: 1.5rem;
  }

  [contenteditable="true"] {
    color: #888;
    outline: none;
    display: inline-block;
    border-bottom: 1px solid #eee;
    min-width: 2rem;
  }

  ${editing
    ? css``
    : css`
        @media (max-width: 750px) and (orientation: landscape) {
          display: none;
        }
      `};
`;

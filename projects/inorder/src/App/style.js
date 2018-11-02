import { css } from "emotion";

export const Container = props => css`
  @import url("https://fonts.googleapis.com/css?family=Raleway|Titillium+Web|Material+Icons");

  font-family: "Titillium Web", sans-serif;

  width: 100%;
  height: 100%;

  padding: 2rem 10rem;
  box-sizing: border-box;

  @media (max-width: 750px) {
    padding: 1rem;
  }

  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    color: #555;
  }
`;

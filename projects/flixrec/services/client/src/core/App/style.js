import { css } from "emotion";

export const Nav = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

  > img {
    height: 2rem;
  }

  @media (min-width: 736px) {
    padding: 2rem 10%;
  }
`;

export const Main = css`
  padding: 1.5rem;
  width: 100%;

  @media (min-width: 736px) {
    padding: 2rem 10%;
  }

  @media (min-width: 980px) {
    padding: 2rem 15%;
  }

  > ul {
    margin-bottom: 2.5rem;
  }
`;

export const Container = css`
  font-family: "Noto Sans TC", sans-serif;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  * ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1rem;
  }

  * ::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 1rem;
  }
`;

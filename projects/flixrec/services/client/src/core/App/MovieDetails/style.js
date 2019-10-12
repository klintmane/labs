import { css } from "emotion";

export const Container = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  > [data-id="content"] {
    padding: 1rem;
    text-align: center;

    small {
      color: gray;
    }

    @media (min-width: 736px) {
      padding: 2.5rem 5rem;
    }

    > header {
      font-weight: 500;
      font-size: 2rem;
    }

    > ul {
      margin: 0;
      padding: 2rem 10%;
      list-style: none;

      display: flex;
      justify-content: space-around;

      > li {
        > header {
          font-weight: normal;
          font-size: 1rem;
          color: gray;
        }
        font-size: 1.3rem;
        font-weight: 500;
      }
    }
  }

  > img {
    width: 100%;
    max-height: 50vh;
    object-fit: cover;
    box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.1);

    border-bottom-left-radius: 50% 25%;
    border-bottom-right-radius: 50% 25%;

    @media (min-width: 736px) {
      border-radius: 2rem;
      width: 60%;
      margin-top: 2rem;
    }
  }
`;

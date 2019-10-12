import { css } from "emotion";

const getHeight = width => Math.round(width / 0.666);

export const Overlay = css`
  position: absolute;
  transition: top 0.1s;
  top: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
  color: white !important;
  font-size: 0.7rem;
  background: #dc1a28;

  > header {
    font-weight: 700;
  }
`;

export const Container = css`
  position: relative;
  width: 8rem;
  min-width: 8rem;
  height: ${getHeight(8)}rem;

  :hover > [data-id="overlay"] {
    top: 0;
  }

  @media (min-width: 736px) {
    width: 12rem;
    min-width: 12rem;
    height: ${getHeight(12)}rem;
  }

  background: #555;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.1);

  display: inline-flex;
  justify-content: center;
  align-items: center;

  > header {
    color: white;
    padding: 1rem;
    text-align: center;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

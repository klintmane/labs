import { css } from "emotion";

export const Strike = props => css`
  position: absolute;
  top: 50%;
  width: 0%;
  height: 1px;
  transition: width 0.2s;
  pointer-events: none;

  input:checked + label + & {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const Container = props => css`
  display: inline-block;
  position: relative;
  padding: 0.25rem 0;

  input {
    display: none;
  }

  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  input:checked + label {
    opacity: 0.5;
  }

  label:before {
    content: "";
    display: inline-block;

    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.5rem;

    border: 2px solid white;
    border-radius: 0.3rem;
    opacity: 0.5;

    transition: opacity 0.3s;
  }

  input:checked + label:before {
    background: white;
    opacity: 0;
  }
`;

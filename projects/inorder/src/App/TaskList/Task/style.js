import { css } from "emotion";

export const Strike = ({ color = "#ccc" }) => css`
  position: absolute;
  top: 50%;
  width: 0%;
  height: 1px;
  transition: width 0.2s;
  pointer-events: none;

  input:checked + label + & {
    width: 100%;
    background: ${color};
  }
`;

export const Container = ({ color = "#ccc" }) => css`
  display: inline-block;
  position: relative;
  padding: 1rem 0;

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
    color: ${color};
  }

  label:before {
    content: "";
    display: inline-block;

    width: 0.8rem;
    height: 0.8rem;
    margin-right: 1.5rem;

    border: 2px solid #ccc;
    border-radius: 0.3rem;
    opacity: 0.5;

    transition: opacity 0.3s;
  }

  input:checked + label:before {
    background: ${color};
    opacity: 0;
  }
`;

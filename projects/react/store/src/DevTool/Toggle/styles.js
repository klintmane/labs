import styled, { css } from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const Button = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  font-weight: bolder;
  border: 2px solid;
  outline: none;
  cursor: pointer;

  ${props =>
    props.shown
      ? css`
          color: silver;
          border-color: silver;
        `
      : css`
          color: #232c33;
          border-color: #232c33;
        `};
`;

export { Container, Button };

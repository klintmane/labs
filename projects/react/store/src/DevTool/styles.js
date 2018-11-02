import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * {
    flex: 1;
  }
`;

const Content = styled.div`
  transition: flex 0.2s ease-in-out;
  overflow: hidden;
  background: #232c33;

  display: flex;

  > *:last-child {
    border-right: none;
  }

  > * {
    flex: 1;
    border-right: 1px solid #eee;
  }

  ${props =>
    props.shown
      ? css`
          flex: 1;
        `
      : css`
          flex: 0;
        `};
`;

export { Container, Content };

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > *:first-child {
    align-self: center;
  }

  > * {
    margin-top: 1rem;
  }
`;

export { Container };

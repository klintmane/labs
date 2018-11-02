import styled from "styled-components";

const Container = styled.div`
  display: flex;
  > * {
    flex: 1;
    border-right: 1px solid #eee;
  }

  > *:last-child {
    border-right: none;
  }
`;

export { Container };

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 0.25rem;
  height: 1.25rem;
  margin: 0.125rem;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));

  border-radius: 5%;
  display: inline-block;
  animation: bounce-w-delay 1s infinite ease-in-out both;

  @keyframes bounce-w-delay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  :nth-child(1) {
    animation-delay: -0.2s;
  }

  :nth-child(2) {
    animation-delay: -0.1s;
  }
`;

export { Container, Item };

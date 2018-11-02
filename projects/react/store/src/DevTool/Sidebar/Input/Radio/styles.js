import styled from "styled-components";

const Container = styled.div``;

const RadioInput = styled.input`
  display: none;

  + label {
    display: inline-block;
    color: silver;
    padding: 0.5rem 2rem;
    border: 2px solid silver;
  }

  + label:hover {
    cursor: pointer;
    color: #232c33;
    background: silver;
  }

  :checked + label {
    background: white;
    border-color: white;
    color: #232c33;
  }
`;
export { Container, RadioInput };

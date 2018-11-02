import styled from "styled-components";

const Container = styled.div``;

const RadioInput = styled.input`
  display: none;

  + label {
    display: inline-block;
    color: #888;
    padding: 0.5rem 2rem;
    border: 1px solid #eee;
  }

  + label:hover {
    cursor: pointer;
    background: #fafafa;
  }

  :checked + label {
    background: #f8f8f8;
  }
`;
export { Container, RadioInput };

import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  background: #fafafa;
  color: #555;
  border-bottom: 1px solid #eee;

  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
    background: #f8f8f8;
  }
`;

const Tag = styled.div`
  font-size: 0.7rem;
  border: 1px solid #eee;
  padding: 0.5rem;
  margin: 0.1rem;
  color: #888;
`;

const Title = styled.div`
  flex: 1;
  padding: 0 1rem;
`;

const Description = styled.div`
  font-size: 0.7rem;
  color: #888;
`;

export { Container, Tag, Title, Description };

import styled from "styled-components";

const StyledContainer = styled.div`
  border: 1px solid lightgray;
  height: ${props => props.height}px;
  width: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StyledInnerContainer = styled.div`
  height: ${props => props.height}px;
`;

const StyledItem = styled.div`
  border-bottom: 1px solid lightgray;
  height: ${props => props.height - 1}px;
`;

const Items = styled.div`
  position: sticky;
  top: ${props => props.top}px;
`;

export { StyledContainer, StyledInnerContainer, Items, StyledItem };

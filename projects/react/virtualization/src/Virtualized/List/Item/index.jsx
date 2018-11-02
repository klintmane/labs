import React from "react";
import { Container } from "./styles";

const Item = ({ children, height }) => (
  <Container height={height}>{children}</Container>
);

export default Item;

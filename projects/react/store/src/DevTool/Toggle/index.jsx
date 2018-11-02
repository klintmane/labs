import React from "react";
import { Container, Button } from "./styles";

const Toggle = ({ shown, onClick }) => (
  <Container>
    <Button shown={shown} onClick={onClick}>
      {shown ? "➖" : "➕"}
    </Button>
  </Container>
);

export default Toggle;

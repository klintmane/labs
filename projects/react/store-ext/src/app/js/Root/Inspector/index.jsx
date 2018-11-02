import React from "react";
import ObjectInspector from "react-object-inspector";

import { Container } from "./styles";

const Inspector = data => (
  <Container>
    <ObjectInspector data={data} />
  </Container>
);

export default Inspector;

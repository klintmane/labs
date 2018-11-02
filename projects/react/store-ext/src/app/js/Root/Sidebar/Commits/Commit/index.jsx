import React from "react";
import { Container, Tag, Title, Description } from "./styles";

const Commit = ({ change, path, timestamp, store }) => (
  <Container>
    <Tag>{timestamp.substring(11, 21)}</Tag>
    <Tag>{store}</Tag>
    <Title>{path}</Title>
    <Description>change: {JSON.stringify(change).substring(0, 20)}</Description>
  </Container>
);

export default Commit;

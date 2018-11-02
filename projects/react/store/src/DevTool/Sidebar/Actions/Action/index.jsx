import React from "react";
import Commits from "../../Commits";
import { Container, Tag, Title, Description } from "./styles";

const Action = ({ store, name, args, commits, timestamp }) => (
  <div>
    <Container>
      <Tag>{timestamp.substring(11, 21)}</Tag>
      <Tag>{store}</Tag>
      <Title>{name}</Title>
      <Description>args: {args.toString()}</Description>
    </Container>
    <Commits store={store} commits={commits} />
  </div>
);

export default Action;

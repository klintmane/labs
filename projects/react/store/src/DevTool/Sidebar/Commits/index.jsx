import React from "react";

import Commit from "./Commit";

const Commits = ({ store, commits }) =>
  commits.map(commit => (
    <Commit key={commit.timestamp} store={store} {...commit} />
  ));

export default Commits;

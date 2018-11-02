import React from "react";

import Action from "./Action";

const Actions = ({ store, actions, commits }) =>
  actions.map(action => (
    <Action
      key={action.timestamp}
      {...action}
      store={store}
      commits={commits.filter(c => c.action === action.timestamp)}
    />
  ));

export default Actions;

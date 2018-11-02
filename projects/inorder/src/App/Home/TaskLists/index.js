import React from "react";

import * as Style from "./style";
import List from "./List";
import NewList from "./NewList";

const TaskLists = props => {
  const { lists = window.mockLists } = props;

  return (
    <div className={Style.Container(props)}>
      {lists.map((list, i) => (
        <List key={i} {...list} />
      ))}
      <NewList />
    </div>
  );
};

export default TaskLists;

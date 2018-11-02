import React from "react";

import * as Style from "./style";
import Task from "./Task";
import Progress from "./Progress";

const getList = id => window.mockLists.find(l => l.id == id);

const List = props => {
  const { match } = props;
  const { name, tasks = [], color } = getList(match.params.id);

  return (
    <div className={Style.Container({ ...props, color })}>
      <header>
        <div>
          <Progress radius={20} stroke={3} progress={80} color={color} />
          &nbsp;
          {name}
        </div>
        <small>2 of 5 left</small>
      </header>
      {tasks.map((task, i) => (
        <Task key={i} {...task} color={color} />
      ))}
    </div>
  );
};

export default List;

import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";
import Task from "./Task";

const List = props => {
  const { id, name, color, tasks = [] } = props;

  return (
    <div className={Style.Container(props)}>
      <header>
        <Link to={`/lists/${id}`}>{name}</Link>
      </header>
      {tasks.map((task, i) => (
        <Task key={i} {...task} />
      ))}
    </div>
  );
};

export default List;

import React from "react";

import * as Style from "./style";

const Task = props => {
  const { name, completed } = props;

  return (
    <div className={Style.Container(props)}>
      <input id={name} type="checkbox" defaultChecked={completed} />
      <label htmlFor={name}>{name}</label>
      <div className={Style.Strike(props)} />
    </div>
  );
};

export default Task;

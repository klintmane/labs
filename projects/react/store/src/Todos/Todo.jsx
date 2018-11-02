import React from "react";

const Todo = ({ todo, remove }) => (
  <div>
    {todo}&nbsp;<button onClick={() => remove(todo)}>x</button>
  </div>
);

export default Todo;

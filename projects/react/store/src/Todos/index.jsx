import React from "react";

import { Subscribe } from "../State";
import Todo from "./Todo";

const Todos = () => (
  <div>
    <Subscribe>
      {({ todos, actions }) =>
        todos.map(todo => (
          <Todo key={todo} todo={todo} remove={actions.removeTodo} />
        ))
      }
    </Subscribe>
  </div>
);

export default Todos;

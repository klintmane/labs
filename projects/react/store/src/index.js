import React from "react";
import { render } from "react-dom";
import { injectGlobal } from "styled-components";

import { Store } from "./State";
import Todos from "./Todos";
import DevTool from "./DevTool";

const fakeFetch = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 200);
  });

const state = { todos: ["Hello", "There", "Human"] };

const actions = {
  addTodo: (todo, { state, commit }) => {
    const todos = [...state.todos, todo];
    commit(todos, "todos");
  },
  removeTodo: async (todo, { state, commit }) => {
    const todos = state.todos.filter(t => t !== todo);
    const result = await fakeFetch();
    commit(todos, "todos");
  }
};

injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

const App = () => (
  <DevTool.Container>
    <Store state={state} actions={actions}>
      <Todos />
    </Store>
    <DevTool />
  </DevTool.Container>
);

render(<App />, document.getElementById("root"));

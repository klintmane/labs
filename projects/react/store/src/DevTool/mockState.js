const state = {
  stores: {
    _default: {
      commits: [
        {
          action: "2018-04-20T09:33:01.759Z",
          timestamp: "2018-04-20T09:33:02.759Z",
          change: ["Shop"],
          path: "todos"
        },
        {
          action: "2018-04-20T09:33:03.759Z",
          timestamp: "2018-04-20T09:33:04.759Z",
          change: ["Shop", "Buy Milk"],
          path: "todos"
        }
      ],
      actions: [
        {
          timestamp: "2018-04-20T09:33:01.759Z",
          name: "addTodo",
          args: ["Shop"]
        },
        {
          timestamp: "2018-04-20T09:33:03.759Z",
          name: "addTodo",
          args: ["Buy Milk"]
        }
      ],
      state: {
        todos: ["Shop", "Buy Milk"]
      }
    }
  }
};

export default state;

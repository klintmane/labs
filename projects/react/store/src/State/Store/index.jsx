import React, { Component } from "react";
import createContext from "../Context";
import { clone, setPath } from "../utils";

class Store extends Component {
  commit = (change, path = "") => {
    const { store } = this.state;
    setPath(store, path, change);
    this.setState({ store });
  };

  createActions = (actions = {}) =>
    Object.entries(actions).reduce(
      (all, [name, fn]) => ({
        ...all,
        [name]: (...args) =>
          fn(...args, { state: clone(this.state.store), commit: this.commit })
      }),
      {}
    );

  constructor(props) {
    super(props);
    const { context = "_default", state = {}, actions = {} } = props;

    this.state = { store: clone(state) };
    this.actions = this.createActions(actions);
    this.Context = createContext(context);
  }

  render() {
    const { actions, Context, props } = this;
    const { store } = this.state;
    return <Context.Provider value={{ state: store, actions }} {...props} />;
  }
}

export default Store;

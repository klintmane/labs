import React, { Component, Fragment } from "react";

import Actions from "./Actions";
import Commits from "./Commits";
import Radio from "./Input/Radio";
import { Container } from "./styles";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: "commits" };
  }

  renderSelection() {
    const { stores } = this.props;
    const { checked } = this.state;

    switch (checked) {
      case "actions":
        return Object.entries(stores).map(([store, { actions, commits }]) => (
          <Actions store={store} actions={actions} commits={commits} />
        ));

      case "commits":
        return Object.entries(stores).map(([store, { commits }]) => (
          <Commits store={store} commits={commits} />
        ));

      default:
        return null;
    }
  }
  render() {
    const { checked } = this.state;
    const { stores } = this.props;

    return (
      <Container>
        <Radio
          name="menu"
          values={["actions", "commits"]}
          checked={checked}
          onChange={val => this.setState({ checked: val })}
        />
        <div>{this.renderSelection()}</div>
      </Container>
    );
  }
}

export default Sidebar;

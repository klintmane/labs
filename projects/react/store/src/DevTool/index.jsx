import React, { Component, Fragment } from "react";
import mockState from "./mockState";
import Sidebar from "./Sidebar";
import Inspector from "./Inspector";
import Toggle from "./Toggle";
import { Container, Content } from "./styles";

class DevTool extends Component {
  constructor(props) {
    super(props);
    this.state = { shown: false, state: mockState };
  }

  toggleShown = () => this.setState({ shown: !this.state.shown });

  render() {
    const { state, shown } = this.state;
    return (
      <Container>
        <Toggle shown={shown} onClick={this.toggleShown} />
        <Content shown={shown}>
          <Sidebar stores={state.stores} />
          <Inspector data={state} />
        </Content>
      </Container>
    );
  }
}

DevTool.Container = Container;

export default DevTool;

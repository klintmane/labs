import React, { Component } from "react";

import mockState from "./mockState";
import { currentTab, isProd } from "./utils";

import Sidebar from "./Sidebar";
import Inspector from "./Inspector";
import { Container } from "./styles";
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = mockState;
  }

  componentDidMount() {
    isProd &&
      currentTab(tab =>
        chrome.runtime.sendMessage(
          { type: "REQ_STATE", tabId: tab.id },
          res => res && this.setState({ stores: res })
        )
      );
  }

  render() {
    return (
      <Container>
        <Sidebar stores={this.state.stores} />
        <Inspector data={this.state} />
      </Container>
    );
  }
}

export default Root;

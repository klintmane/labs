import React, { Component } from "react";
import ReactDOM from "react-dom";
import genData from "./data";
import { AppContainer } from "./styles";
import Virtualized from "./Virtualized";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: genData("Some list item", 100) };
  }

  loadMoreData() {
    if (this.state.data.length < 200) {
      this.setState({
        data: [...this.state.data, ...genData("Some additional item", 10)]
      });
    }
  }

  render() {
    return (
      <AppContainer>
        <h1>Virtualized list</h1>
        <Virtualized
          items={this.state.data}
          showLoader={this.state.data.length < 200}
          handleTop={() => console.log("on Top")}
          handleBottom={() => this.loadMoreData()}
        />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

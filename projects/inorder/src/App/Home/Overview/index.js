import React from "react";
import * as Style from "./style";

class Overview extends React.Component {
  state = { editing: false };

  handleFocus = () => this.setState({ editing: true });
  handleBlur = () => this.setState({ editing: false });

  render() {
    const { editing } = this.state;

    return (
      <div className={Style.Container({ ...this.props, editing })}>
        Hi&nbsp;
        <div
          contentEditable
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          Stranger
        </div>
        ,<br />
        <small>5 tasks left</small>
      </div>
    );
  }
}

export default Overview;

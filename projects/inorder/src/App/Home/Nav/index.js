import React from "react";

import * as Style from "./style";
import Settings from "./Settings";

import logo from "./logo.png";

const Nav = props => {
  return (
    <div className={Style.Container(props)}>
      <header>
        <img src={logo} alt="logo" />
        <strong>inorder</strong>
      </header>
      <Settings />
    </div>
  );
};

export default Nav;

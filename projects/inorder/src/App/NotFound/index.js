import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";

const NotFound = props => {
  return (
    <div className={Style.Container(props)}>
      <header>Whoops</header>
      <p>The page your required was not found</p>
      <Link to="/">
        <i className="material-icons">chevron_left</i>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;

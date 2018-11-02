import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";

const Settings = props => {
  return (
    <div className={Style.Container(props)}>
      <Link to="/settings">
        <i className="material-icons">settings</i>
      </Link>
    </div>
  );
};

export default Settings;

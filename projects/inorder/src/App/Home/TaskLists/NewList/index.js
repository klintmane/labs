import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";

const List = props => {
  const { title, color } = props;

  return (
    <Link to="/lists/new" className={Style.Container(props)}>
      <i className="material-icons">add</i>
    </Link>
  );
};

export default List;

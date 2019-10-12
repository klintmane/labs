import React from "react";
import * as style from "./style";

export const Icon = props => {
  const { name, size = 1.5, ...rest } = props;

  return (
    <i {...rest} className={style.Container(size) + " " + "material-icons"}>
      {name}
    </i>
  );
};

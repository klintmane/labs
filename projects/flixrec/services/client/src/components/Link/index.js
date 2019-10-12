import React from "react";
import { NavLink } from "react-router-dom";
import * as Style from "./style";

export const Link = props => {
  const { to, href, variant, className, ...rest } = props;

  const link = to || href;
  const isRelative = link && !/^((f|ht)tps?:)?\/\//i.test(link);

  return isRelative ? (
    <NavLink
      activeClassName="active"
      className={className + " " + Style.Container(props)}
      to={link}
      {...rest}
    />
  ) : (
    <a
      className={className + " " + Style.Container(props)}
      href={link}
      {...rest}
    />
  );
};

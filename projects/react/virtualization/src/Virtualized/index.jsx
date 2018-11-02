import React from "react";
import List from "./List";

const Virtualized = props => {
  const {
    height = 500,
    items = [],
    itemHeight = 40,
    offset = 5,
    showLoader = true,
    handleTop = () => null,
    handleBottom = () => null,
    ...rest
  } = props;

  return (
    <List
      height={height}
      items={items}
      itemHeight={itemHeight}
      offset={offset}
      showLoader={showLoader}
      handleTop={handleTop}
      handleBottom={handleBottom}
      {...rest}
    />
  );
};

export default Virtualized;

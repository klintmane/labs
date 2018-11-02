import React from "react";

import * as Style from "./style";
import Nav from "./Nav";
import TaskLists from "./TaskLists";
import Overview from "./Overview";

const Home = props => {
  return (
    <div className={Style.Container(props)}>
      <Nav />
      <Overview />
      <TaskLists />
    </div>
  );
};

export default Home;

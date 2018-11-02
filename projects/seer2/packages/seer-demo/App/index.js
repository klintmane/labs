import Seer from "seer";

import Header from "./Header";
import Counter from "./Counter";
import { Router, Route, Link } from "./seer-router";

const App = (props, content) => (
  <div>
    <Header title="Demo">This is a Demo</Header>
    <Route match="/home">
      <div>HOME</div>
    </Route>
    <Route match="/counter">
      <Counter>Counter Component</Counter>
    </Route>
    <Link href="/home">Home</Link>
    <Link href="/counter">Counter</Link>
  </div>
);

export default App;

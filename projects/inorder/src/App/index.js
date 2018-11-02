import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as Style from "./style";
import Home from "./Home";
import NotFound from "./NotFound";
import TaskList from "./TaskList";
import NewTaskList from "./NewTaskList";
import Settings from "./Settings";

window.mockLists = [
  {
    id: 1,
    name: "Trip to Budapest",
    color: "#581845",
    tasks: [
      { name: "Book Flights", completed: true },
      { name: "Hotel Reservation", completed: false },
      { name: "Pack luggage", completed: false }
    ]
  },
  {
    id: 2,
    name: "Groceries",
    color: "#FF5733",
    tasks: [
      { name: "100g Cashews", completed: false },
      { name: "500g Peanuts", completed: true },
      { name: "1kg Spinach", completed: false }
    ]
  },
  {
    id: 3,
    name: "My Tasks",
    color: "#FFC300",
    tasks: [{ name: "Finish Project", completed: false }]
  }
];

const App = props => {
  return (
    <div className={Style.Container(props)}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/lists/new" component={NewTaskList} />
          <Route exact path="/lists/:id" component={TaskList} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

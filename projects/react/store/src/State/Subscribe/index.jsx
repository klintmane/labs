import React from "react";
import createContext from "../Context";

const Subscriber = ({ render, ...props }) => {
  const Component = render;
  return <Component {...props} />;
};

const Subscribe = ({
  context = "_default",
  getState = state => state,
  component,
  children
}) => {
  const Context = createContext(context);

  return (
    <Context.Consumer>
      {({ state, actions }) => (
        <Subscriber
          render={component || children}
          {...getState(state)}
          actions={actions}
        />
      )}
    </Context.Consumer>
  );
};

export default Subscribe;

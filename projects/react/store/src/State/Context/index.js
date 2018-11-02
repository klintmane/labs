import React from "react";

const contexts = {
  default: React.createContext("_default")
};

export default id => {
  contexts[id] = contexts[id] || React.createContext(id);
  return contexts[id];
};

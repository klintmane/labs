// The function used when transpiling JSX -> function call
const h = (type, props = {}, ...children) => {
  props = props || {};
  return { type, props, children };
};

// Dependencies
// (props) -> state
// (props, state) -> methods
// (props, state, methods) -> render

// Must be able to observe multiple values and
// set the variable value to a proxy itself
// so it can be observed as well

const state = observe(props, props => ({}));
const methods = observe([props, state], (props, state) => ({}));
const render = observe([props, state, methods], (props, state, methods) => ({}));

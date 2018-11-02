const listeners = [];

export const push = route => {
  console.log("PUSHED", route);
  const prevRoute = window.location.pathname;
  window.history.pushState(null, null, route);
  listeners.forEach(listener => listener(route, prevRoute));
};

export const listen = fn => {
  listeners.push(fn);
};

export default { push, listen };

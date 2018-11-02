import { propType } from "./utils";

const updateEventHandlers = (dom, prop, val) => {
  dom.__handlers = dom.__handlers || {};
  const event = prop.slice(2).toLowerCase();

  dom.removeEventListener(event, dom.__handlers[event]); // Remove old listener

  dom.__handlers[event] = val;
  dom.addEventListener(event, dom.__handlers[event]); // Add new listener
};

export const updateProp = (dom, prop, val) => {
  switch (propType(prop)) {
    case "CHILDREN":
      return;

    case "REF":
      val === "function" ? val(dom) : console.warn("ref must be a function");
      break;

    case "KEY":
      dom.__key = val;
      break;

    case "EVENT":
      updateEventHandlers(dom, prop, val);
      break;

    case "STYLE":
      dom.style = { ...(dom.style || {}), ...(val || {}) };
      break;

    case "PROP":
      dom[prop] = val;
      break;

    case "ATTRIB":
      dom.setAttribute(prop, val);
      break;
  }
};

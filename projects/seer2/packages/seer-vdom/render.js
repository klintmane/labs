import { updateProp } from "./props";
import { vdomType, isType } from "./utils";

const render = (vdom, parent = null) => {
  const mount = parent ? e => parent.appendChild(e) : e => e;

  switch (vdomType(vdom)) {
    case "TEXT":
      const content = isType(vdom, "string", "number") ? vdom : "";
      return mount(document.createTextNode(content));

    case "ELEMENT":
      const node = mount(document.createElement(vdom.type));

      for (const child of [...vdom.children]) {
        render(child, node);
      }

      for (const prop in vdom.props) {
        updateProp(node, prop, vdom.props[prop]); // TODO: Optimization (only update if props changes)
      }

      return node;

    case "COMPONENT":
      return component.render(vdom, parent);
  }
};

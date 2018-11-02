import { nodeType } from "./utils";

const patch = (dom, vdom, parent = dom.parentNode) => {
  const replace = parent ? e => parent.replaceChild(e, dom) && e : e => e;
  const VDOM_TYPE = nodeType(vdom);

  // Handle textual content
  if (dom instanceof Text) {
    if (VDOM_TYPE === "TEXT") {
      // Replace or keep the text
      return dom.textContent !== vdom ? replace(render(vdom, parent)) : dom;
    } else {
      // Replace the node
      return replace(render(vdom, parent));
    }
  }

  // Handle primitive DOM elements
  if (VDOM_TYPE === "ELEMENT") {
    // If the same element
    if (dom.nodeName === vdom.type.toUpperCase()) {
      const pool = {};
      const active = document.activeElement;
      [...dom.childNodes].map((child, index) => {
        const key = child.__gooactKey || `__index_${index}`;
        pool[key] = child;
      });
      [...vdom.children].map((child, index) => {
        const key = (child.props && child.props.key) || `__index_${index}`;
        dom.appendChild(
          pool[key] ? patch(pool[key], child) : render(child, dom)
        );
        delete pool[key];
      });
      for (const key in pool) {
        const instance = pool[key].__gooactInstance;
        if (instance) instance.componentWillUnmount();
        pool[key].remove();
      }
      for (const attr of dom.attributes) dom.removeAttribute(attr.name);
      for (const prop in vdom.props) setAttribute(dom, prop, vdom.props[prop]);
      active.focus();
      return dom;
    } else {
      return replace(render(vdom, parent));
    }
  }

  // Handle components
  if (VDOM_TYPE === "COMPONENT") {
    // Delegate the patching to the component itself
    return component.patch(dom, vdom, parent);
  }
};

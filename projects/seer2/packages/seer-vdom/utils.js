export const isType = (vdom, types = "", ...rest) => {
  const [primary, secondary] = types.split(".");

  const p = typeof vdom === primary;
  const s = typeof vdom.type === secondary;

  const result = secondary ? p && s : p;
  return rest.length > 0 ? result || isType(vdom, ...rest) : result;
};

export const vdomType = vdom =>
  isType(vdom, "object.function")
    ? "COMPONENT"
    : isType(vdom, "object.string")
      ? "ELEMENT"
      : isType(vdom, "object")
        ? throw "Unknown Node Type"
        : "TEXT";

export const propType = prop =>
  prop === "children"
    ? "CHILDREN"
    : prop === "ref"
      ? "REF"
      : prop === "key"
        ? "KEY"
        : prop.startsWith("on")
          ? "EVENT"
          : prop === "style"
            ? "STYLE"
            : ["value", "checked", "className"].some(i => i === prop)
              ? "PROP"
              : "ATTRIB";

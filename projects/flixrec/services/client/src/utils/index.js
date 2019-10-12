export * from "./hooks";
export * from "./json";
export * from "./obj";

export const uid = () =>
  Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);

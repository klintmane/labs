import lodashMerge from "lodash.merge";

const merge = (obj, ...objs) => lodashMerge(clone(obj), ...objs);

const debounce = (cb, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      cb(...args);
    }, time);
  };
};

const formattedPath = path =>
  path
    .replace(/\[["'`]([\w\d]+)["'`]\]/g, "$1")
    .split(/(\[\d+\])/)
    .join(".")
    .replace(/\.+/g, ".");

const setPath = (obj = {}, path = "", val) => {
  if (val === undefined) {
    return;
  }

  const matchedKey = key => {
    const match = key.match(/\[(\d+)\]/);

    if (match) {
      key = parseInt(match[1]);
    }

    return { match, value: key };
  };

  const keys = formattedPath(path)
    .split(".")
    .filter(key => key !== "");

  while (keys.length > 0) {
    let key = matchedKey(keys.shift()).value;

    if (keys.length === 0) {
      obj[key] = val;
    } else {
      if (!obj[key]) {
        obj[key] = matchedKey(keys[0]).match ? [] : {};
      }

      obj = obj[key];
    }
  }
};

const getPath = (object = {}, path = "") =>
  formattedPath(path)
    .replace(/\[(\d+)\]/g, "$1")
    .split(".")
    .reduce((obj, key) => (obj ? obj[key] : undefined), object);

const clone = item => JSON.parse(JSON.stringify(item));

export { debounce, setPath, getPath, clone, merge };

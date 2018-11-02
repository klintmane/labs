const clone = thing => JSON.parse(JSON.stringify(thing));

const deepFreeze = target => {
  if (target === Object(target)) {
    Object.freeze(target);
    Object.values(target).map(value => deepFreeze(value));
  }
};

const isDefined = val => typeof val !== "undefined";

const formattedPath = path =>
  path
    .replace(/\[["'`]([\w\d]+)["'`]\]/g, "$1")
    .split(/(\[\d+\])/)
    .join(".")
    .replace(/\.+/g, ".");

const setPath = (obj = {}, path = "", val) => {
  if (!isDefined(val)) {
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

export { clone, deepFreeze, setPath };

import Seer, { comp } from "seer";

const Store = () => {
  const _store = { location: "/" };
  const _subs = [];

  return {
    get: key => _store[key],
    set: (key, val) => {
      _store[key] = val;
      _subs[key].forEach(sub => sub(val));
    },
    sub: (key, fn) => {
      _subs[key] = _subs[key] || [];
      typeof fn === "function" && _subs[key].push(fn);
    }
  };
};

const globalStore = Store();

export default globalStore;

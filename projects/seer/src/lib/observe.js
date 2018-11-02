const isObservable = value => !!value._subscribe;
const isInnerKey = key => ["_value", "_subscribe", "_notify"].includes(key);

const get = (obj, key) => (isInnerKey(key) ? obj[key] : obj._value[key]);
const set = (obj, key, val) => (isInnerKey(key) ? (obj[key] = val) : (obj._value[key] = val));
const arraify = x => (Array.isArray(x) ? x : [x]);
const notify = (observable, subscribers) => subscribers.forEach(sub => sub(observable));

const clone = x => JSON.parse(JSON.stringify(x));

const makeObservable = _value => {
  const value = { _value };
  const subscribers = [];

  let observable;
  observable = new Proxy(value, {
    get: get,
    set: (...args) => {
      set(...args);
      notify(observable, subscribers);
      return true;
    }
  });

  observable._subscribe = cb => subscribers.push(cb);
  observable._notify = () => notify(observable, subscribers);
  return observable;
};

const deriveValue = (observables, fn) => {
  const getDefault = () => observables.reduce((result, o) => ({ ...result, ...clone(o._value) }), {});
  const custom = fn && fn(...observables.map(o => clone(o._value)));
  return custom !== undefined ? custom : getDefault();
};

const observe = (_values, deriveFn) => {
  const values = arraify(_values).map(v => (!isObservable(v) ? makeObservable(v) : v));

  let observable;

  const deriveValueCb = (/* target */) => {
    observable._value = deriveValue(values, deriveFn);
    observable._notify();
  };

  values.forEach(t => t._subscribe(deriveValueCb));
  observable = makeObservable(deriveValue(values, deriveFn));

  return observable;
};

const o1 = observe({ a: 123 }, value => {});
const o2 = observe({ b: 321 }, value => {});
const o3 = observe([o1, o2], console.log);

o1.c = "WOW";
o2.d = "OWO";

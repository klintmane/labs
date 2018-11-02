const clone = x => (typeof x === "function" ? x : JSON.parse(JSON.stringify(x)));

const resourceHandler = ({ onSet }) => ({
  set: (resource, key, val) => {
    const old = clone(resource);
    const current = { ...old, [key]: val };

    resource[key] = val;
    onSet && typeof onSet === "function" && onSet(old, current);
  }
});

class Resource {
  constructor(resource, deps = {}, proxyConfig = {}) {
    this.deps = deps;
    this._resource = resource;
    this.resource = clone(resource);
    this.proxy = obj => new Proxy(obj, resourceHandler(proxyConfig));
  }

  compute() {
    return new Promise(async (resolve, reject) => {
      if (this.deps && typeof this.resource === "function") {
        const deps = {};

        for (const key in this.deps) {
          const dep = this.deps[key];
          deps[key] = await dep.compute();
        }
        resolve(this.proxy(this.resource(deps)));
      } else {
        resolve(this.proxy(this.resource));
      }
    });
  }

  async set(key, val) {
    const resource = await this.compute();
    resource[key] = val;
  }

  async get(key) {
    const resource = await this.compute();
    return resource[key];
  }
}

export default Resource;

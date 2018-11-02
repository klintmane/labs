import Resource from "./Resource.js";
export * from "./html.js";

const createComponent = (name, config) => {
  class Component extends HTMLElement {
    constructor() {
      super();
      const { props, state, methods } = config;

      // The proposed API
      // const props = observe(config.props);
      // const state = observe(props, config.state);
      // const methods = observe([props, state], config.methods);

      this.Props = new Resource(props, {}, { onSet: () => this.render() });
      this.State = new Resource(state, { props: this.Props }, { onSet: () => this.render() });
      this.Methods = new Resource(methods, { props: this.Props, state: this.State });
    }

    async syncProps() {
      const props = await this.Props.compute();

      for (const key in props) {
        const prop = this.getAttribute(key);
        if (prop) {
          await this.Props.set(key, prop);
        }
      }
    }

    async computeMethods() {
      const methods = await this.Methods.compute();

      for (const key in methods) {
        const _key = `SEER_method_${key}`; // Add name

        window[_key] = (...args) => {
          if (args[0] === "WHO_AM_I") {
            return `${_key}(event)`;
          }
          return methods[key](...args);
        };

        await this.Methods.set(key, window[_key]);
      }
    }

    async render() {
      const props = await this.Props.compute();
      const state = await this.State.compute();
      const methods = await this.Methods.compute();

      const html = await config.render({ props, state, methods });
      this.shadowRoot.innerHTML = html;

      console.log({ props, state, methods });
    }

    /**
     * Called after the element is attached to the DOM
     * 1) We attach a shadow DOM tree to the element
     * 2) We call the render function for the first time
     */
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.render();
    }

    /**
     * Specifies the element attributes which will be observed
     */
    static get observedAttributes() {
      return Object.keys(config.props);
    }

    /**
     * Called when the observed attributes change
     * 1) We sync the attributes (save their new values)
     */
    async attributeChangedCallback() {
      await this.syncProps();
    }
  }

  customElements.define(name, Component);
};

export default createComponent;

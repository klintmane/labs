import create, { html } from "../lib/index.js";

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const GreetingView = create("greeting-view", {
  props: { name: "Mystery Man" },
  state: comp => ({ name: `Mr. ${comp.props.name}` }),
  methods: comp => ({
    reset: () => console.log("reset"),
    test: () => {
      comp.state.name = "abc";
    }
  }),
  render: comp => {
    //console.log(comp);
    const { name } = comp.state;
    const { reset, test } = comp.methods;
    //await timeout(1000);
    console.log(comp.methods.test);
    return html`
      <div>
        <div>Hello, ${name}</div>
        <button onclick=${test}>Reset</button>
      </div>
    `;
  }
});

export default GreetingView;

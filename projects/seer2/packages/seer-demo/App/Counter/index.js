import Seer, { comp } from "seer";

const Counter = comp(
  (props, content, state) => {
    const incr = () => state.set("count", state.count + 1);
    const decr = () => state.set("count", state.count - 1);

    return (
      <div>
        <h1>{content || props.title}</h1>
        <button onclick={decr}>-</button>
        <span>{state.count}</span>
        <button onclick={incr}>+</button>
      </div>
    );
  },
  {
    state: { count: 1 },
    mount: () => console.log("mounted"),
    unmount: () => console.log("unmounted"),
    update: () => console.log("updated")
  }
);

export default Counter;

import Seer, { comp } from "seer";
import history from "./history";

export const Route = comp(
  (props, content, state) => {
    const { match } = props;
    const { path } = state;

    return match === path ? <div>{content}</div> : <div />;
  },
  {
    state: { path: window.location.pathname },
    mount: (props, content, state) => {
      // Add listener for Route pushes (using history.push)
      history.listen((route, prevRoute) => {
        state.set("path", route);
      });

      // Add listener for window.location change (manual)
      window.addEventListener("popstate", e =>
        state.set("path", window.location.pathname)
      );
    }
  }
);

export const Link = (props, content) => {
  const { href, onclick } = props;

  return (
    <a
      {...props}
      onclick={e => {
        e.preventDefault();
        onclick && onclick();
        history.push(href);
      }}
    >
      {content}
    </a>
  );
};

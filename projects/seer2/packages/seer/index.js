import { h, mount, patch, unmount } from "petit-dom";

const Seer = {};

Seer.component = h;
Seer.render = mount;

export function comp(view, config = {}) {
  const { state = {} } = config;

  let _vnode = null;
  let _props = null;
  let _content = null;

  const _state = {
    set: (key, val, promise) => {
      const oldVal = state[key];
      state[key] = val;
      refreshView();

      // Optimistic Updates
      if (promise) {
        promise().catch(e => {
          state[key] = oldVal;
          refreshView();
        });
      }
    }
  };

  Object.keys(state).forEach(key => {
    Object.defineProperty(_state, key, { get: () => state[key] });
  });

  const refreshView = () => {
    const oldNode = _vnode;
    _vnode = view(_props, _content, _state);
    patch(_vnode, oldNode);
  };

  return {
    mount: (props, content) => {
      _props = props;
      _content = content;
      _vnode = view(props, content, _state);

      const node = mount(_vnode);

      config.mount && config.mount(_props, _content, _state);
      return node;
    },

    patch: (node, newProps, oldProps, newContent, oldContent) => {
      _props = newProps;
      _content = newContent;

      refreshView();

      config.update && config.update(_props, _content, _state);
      return node;
    },

    unmount: node => {
      config.unmount && config.unmount(_props, _content, _state);
      return unmount(_vnode);
    }
  };
}

export default Seer;

const component = (render, { state = {}, mount, unmount, update }) => {
  component.instance = { render, state, mount, unmount, update };
};

component.render = (vdom, parent = null) => {
  const props = { ...vdom.props, children: vdom.children };

  if (component.instance) {
    instance.mounting(props);
    instance.view = instance.render(props, instance.state);
    instance.mount(props);

    return render(instance.view, parent);
  } else {
    render(vdom.type(props), parent);
  }
};

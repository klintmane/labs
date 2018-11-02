import React, { Component } from "react";
import Context from "./Context";
import { debounce } from "./utils";

const Input = ({ onChange, ...rest }) => (
  <input
    {...rest}
    onChange={e => {
      onChange(e.target.value);
    }}
  />
);

/**
 * ------------------------------------------------------
 * PROPS
 * ------------------------------------------------------
 * name: string
 * validate: value => { errors: {} }
 * encode: value => encoded  // Encode the value for storing
 * decode: value => decoded  // Decode the value for displaying
 * compute: (value, values) => computed // Compute a new value
 *
 * ------------------------------------------------------
 * API
 * ------------------------------------------------------
 *
 */

class FieldProvider extends Component {
  state = { value: "", validation: { error: null, warning: null } };
  getAPI = Form => {
    const { name } = this.props;
    const { value } = this.state;

    const setValue = value => this.setState({ value });
    const setFormValue = debounce(Form._consumer.setField, 1000);
    const setFormTouched = name => Form.touched.add(name);

    return {
      value,
      setValue,
      onChange: value => {
        setValue(value);
        setFormValue(name, value);
        setFormTouched(name);
      }
    };
  };

  render() {
    return (
      <Context.Form.Consumer>
        {Form => (
          <Context.Field.Provider value={this.getAPI(Form)}>
            <Context.Field.Consumer>
              {Field => (
                <FieldConsumer {...this.props} Field={Field} Form={Form} />
              )}
            </Context.Field.Consumer>
          </Context.Field.Provider>
        )}
      </Context.Form.Consumer>
    );
  }
}

class FieldConsumer extends Component {
  componentDidMount() {
    const { name, Form, Field } = this.props;
    Form._consumer.set(name, Field);
    Field.setValue(Form.getField(name));
  }

  render() {
    const { render = Input, Field, ...rest } = this.props;
    const Component = render;
    return <Component {...rest} {...Field} />;
  }
}

export default FieldProvider;

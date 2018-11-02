import React, { Component } from "react";
import Context from "./Context";
import { getPath, setPath, clone, merge } from "./utils";

class Form extends Component {
  state = {
    values: this.props.initialValues || {}
  };

  /**
   * ------------------------------------------------------
   * PROPS
   * ------------------------------------------------------
   * initialValues
   * validate: data => { errors: {} }
   *
   * ------------------------------------------------------
   * API
   * ------------------------------------------------------
   * values: {} // The values of the form, fields will sync
   *
   * validation: { errors, warnings } // Form-level validation, field-level validation will sync
   *
   * touched: [] (Unique set)
   *
   * submitForm() // Will run form-validation and check validation (including field-level validation) before submitting
   *              // Will then call the onSubmit prop passed to the form
   *
   * getField(name: string) // returns the field with the given name
   * getFields(names: array, path: string) // retunrs all the fields if no fields specified
   *
   * setField(name: string, value: any) // sets the field to the given value
   * setFields(fields: object, path: string) // sets the fields to the given values
   *
   * resetField(name: string) // resets the field with the given name
   * resetFields(names: array) // resets all fields if no fields specified
   */

  touched = new Set();

  _consumers = {};
  _getConsumer = name => this._consumers[name];
  _setConsumer = (name, api) => (this._consumers[name] = api);

  initialFields = () => {
    const values = {};
    Object.keys(this._consumers).forEach(name => setPath(values, name, ""));
    return values;
  };
  initialValues = (includeUnspecified = true) => {
    const { initialValues = {} } = this.props;
    return includeUnspecified
      ? initialValues
      : merge(this.initialFields(), initialValues);
  };

  getField = (name = "") => getPath(this.state.values, name);
  getFields = (names = [], path = "") => {
    if (names.length > 0) {
      return names.reduce((values, name) => {
        const fullPath = path ? `${path}.${name}` : name;
        setPath(values, fullPath, this.getField(fullPath));
        return values;
      }, {});
    }
    return merge(this.initialFields(), this.state.values);
  };

  _setField = (name = "", value = "") => {
    const values = clone(this.state.values);
    setPath(values, name, value);
    this.setState({ values });
  };
  setField = (name = "", value = "") => {
    this._setField(name, value);
    this._getConsumer(name).setValue(value);
  };
  setFields = (fields = {}, path = "") => {
    for (let name in fields) {
      const fullPath = path ? `${path}.${name}` : name;
      this.setField(fullPath, fields[name]);
    }
  };

  resetField = (name = "") =>
    this.setField(name, getPath(this.initialValues, name));
  resetFields = (names = []) => {
    const fields = names.length > 0 ? names : [...this.touched];
    fields.forEach(this.resetField);
  };

  API = {
    initialValues: this.initialValues,
    _consumer: {
      get: this._getConsumer,
      set: this._setConsumer,
      setField: this._setField
    },
    touched: this.touched,
    getField: this.getField,
    getFields: this.getFields,
    setField: this.setField,
    setFields: this.setFields,
    resetField: this.resetField,
    resetFields: this.resetFields
  };

  render() {
    window.API = this.API;
    return (
      <Context.Form.Provider value={this.API}>
        {this.props.children}
        <div>Values (Initial): {JSON.stringify(this.API.initialValues)}</div>
        <div>Values: {JSON.stringify(this.state.values)}</div>
      </Context.Form.Provider>
    );
  }
}

export default Form;

import React from "react";
import { render } from "react-dom";
import Form from "./SimpleForm/Form";
import Field from "./SimpleForm/Field";

const App = () => (
  <Form initialValues={{ person0: { email: "bob@mail.com" } }}>
    {[...Array(500).keys()].map(i => (
      <Field key={i} type="text" name={`person${i}.email`} />
    ))}
  </Form>
);

render(<App />, document.getElementById("root"));

import React, { Fragment } from "react";
import { Container, RadioInput } from "./styles";

const Radio = ({ name, values = [], checked, onChange }) => (
  <Container>
    {values.map((value, i) => (
      <Fragment>
        <RadioInput
          type="radio"
          id={value}
          name={name}
          value={value}
          checked={checked === value}
          onChange={e => onChange(e.target.value)}
        />
        <label htmlFor={value}>{value}</label>
      </Fragment>
    ))}
  </Container>
);

export default Radio;

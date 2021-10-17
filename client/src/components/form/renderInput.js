import React from 'react';
import { FormGroup, Label, FormFeedback, Input } from 'reactstrap';
import classnames from 'classnames';

const renderInput = ({
  input, label, placeholder, type, style, meta: { touched, error },
}) => (
  <FormGroup style={style}>
    <Label>{label}</Label>
    <Input
      {...input}
      type={type}
      placeholder={placeholder}
      className={classnames('form-control', { 'is-invalid': error && touched })}
    />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
);

export default renderInput;

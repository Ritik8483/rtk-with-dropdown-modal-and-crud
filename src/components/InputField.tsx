import React from "react";
import Form from "react-bootstrap/Form";

const InputField = ({
  name,
  controlId,
  value,
  onChange,
  errors,
  isInvalid,
  placeholder,
  label,
  type,
}: any) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control name={name} type={type} value={value} isInvalid={isInvalid} placeholder={placeholder} onChange={onChange} />
        <Form.Control.Feedback type="invalid"  >
            {errors}
            
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default InputField;

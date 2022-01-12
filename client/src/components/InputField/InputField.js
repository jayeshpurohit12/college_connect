import React from 'react';
import './InputField.css';

export default function InputField(props) {
  return (
    <input
      className="input__style"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
}
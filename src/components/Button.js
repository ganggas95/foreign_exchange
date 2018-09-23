import React from "react";
const Button = props => (
  <button {...props}>
    {props.icon && (
      <i className={`${props.icon.position} ${props.icon.name} icon ui`} />
    )}
    {props.text}
  </button>
);

export default Button;

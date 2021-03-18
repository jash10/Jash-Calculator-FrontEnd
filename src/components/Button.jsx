import { React } from "react";
import "./Components.css";

const isOperator = (val) => {
  return !isNaN(val) || val === "." || val === "=";
};

const isNumber = (val) => {
  return isNaN(val);
};

const isClearButton = (val) => {
  return val.match(/[a-z]/i);
};

export const Button = (props) => (
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? null : "operator"
    } ${
      !(
        isClearButton(props.children) &&
        !isOperator(props.children) &&
        isNumber(props.children)
      )
        ? null
        : "clearButton"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

import React from "react";
import "./buttonNeumor.css";

const ButtonNeumor = ({
  width = 40,
  height = 40,
  customClass = "",
  children,
  onClick = () => {},
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`button-neumor ${customClass}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ButtonNeumor;

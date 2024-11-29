import React from "react";
import Logo from "@/Assets/images/logo/logo.svg?react";

const LogoButton: React.FC<{ onClick?: () => void }> = ({
  onClick = () => {},
}) => (
  <button
    className="btn btn-logo"
    type="button"
    aria-label="Restart"
    onClick={onClick}
  >
    <Logo />
  </button>
);

export default LogoButton;

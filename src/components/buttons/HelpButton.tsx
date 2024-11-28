import React, { useState } from "react";
import HelpIcon from "@/Assets/images/icons/help.svg?react";
import CloseIcon from "@/Assets/images/icons/close.svg?react";
import HelpMenu from "@/Components/HelpMenu";

const HelpButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="btn-help-container">
      {open && <HelpMenu />}
      <button
        className="btn btn-icon btn-help"
        type="button"
        role="switch"
        aria-checked={open}
        aria-label={`${open ? "Close" : "Open"} help menu`}
        onClick={() => setOpen(!open)}
      >
        <div className="btn-inner">{open ? <CloseIcon /> : <HelpIcon />}</div>
      </button>
    </div>
  );
};

export default HelpButton;

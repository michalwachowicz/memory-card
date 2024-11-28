import React from "react";
import CloseIcon from "@/Assets/images/icons/close.svg?react";
import BackIcon from "@/Assets/images/icons/back.svg?react";

const HelpMenu: React.FC = () => (
  <div className="help">
    <div className="help-section">
      <div className="help-section-inner">
        <CloseIcon className="help-icon" />
        <p className="help-description">Don’t click on the same card twice</p>
      </div>
    </div>
    <div className="help-section">
      <div className="help-section-inner">
        <BackIcon className="help-icon" />
        <p className="help-description">Click “The Witcher” logo to restart</p>
      </div>
    </div>
  </div>
);

export default HelpMenu;

import React from "react";
import Icon from "@/Assets/images/icons/sound.svg?react";

interface Props {
  enabled?: boolean;
  onToggle?: (value?: boolean) => void;
}

const SoundButton: React.FC<Props> = ({
  enabled = false,
  onToggle = () => {},
}) => (
  <button
    className={`btn btn-icon btn-sound ${!enabled ? "btn-sound-disabled" : ""}`}
    type="button"
    role="switch"
    aria-checked={enabled}
    aria-label={`${enabled ? "Disable" : "Enable"} sound`}
    onClick={() => onToggle && onToggle(!enabled)}
  >
    <div className="btn-inner">
      <Icon />
    </div>
  </button>
);

export default SoundButton;

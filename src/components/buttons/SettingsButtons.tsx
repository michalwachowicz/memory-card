import React from "react";
import SoundButton from "@/Components/buttons/SoundButton";
import HelpButton from "@/Components/buttons/HelpButton";

interface Props {
  soundOn?: boolean;
  onSoundToggle?: (sound?: boolean) => void;
}

const SettingsButtons: React.FC<Props> = ({
  soundOn = false,
  onSoundToggle = () => {},
}) => (
  <div className="btns-settings">
    <SoundButton enabled={soundOn} onToggle={onSoundToggle} />
    <HelpButton />
  </div>
);

export default SettingsButtons;

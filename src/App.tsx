import { useState } from "react";
import Background from "@/Components/Background";
import MainScreen from "@/Components/screens/MainScreen";
import SettingsButtons from "@/Components/buttons/SettingsButtons";

const App = () => {
  const [sound, setSound] = useState(false);

  const toggleSound = (newSound: boolean | undefined) => {
    if (newSound === undefined) return;
    setSound(newSound);
  };

  return (
    <div>
      <SettingsButtons soundOn={sound} onSoundToggle={toggleSound} />
      <MainScreen />
      <Background opacity={0.55} music={sound} />
    </div>
  );
};

export default App;

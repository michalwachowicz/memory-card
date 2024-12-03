import { useState } from "react";
import Background from "@/Components/Background";
import GameWrapper from "@/Components/GameWrapper";

const App = () => {
  const [sound, setSound] = useState(false);

  const toggleSound = (newSound: boolean | undefined) => {
    if (newSound === undefined) return;
    setSound(newSound);
  };

  return (
    <div>
      <GameWrapper sound={sound} onSoundToggle={toggleSound} />
      <Background opacity={0.55} music={sound} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import Background from "@/Components/Background";
import GameWrapper from "@/Components/GameWrapper";
import LoadingScreen from "@/Components/screens/LoadingScreen";
import { preloadCards } from "./managers/cardManager";

const App = () => {
  const [sound, setSound] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSound = (newSound: boolean | undefined) => {
    if (newSound === undefined) return;
    setSound(newSound);
  };

  useEffect(() => {
    preloadCards();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading && <LoadingScreen />}
      {!loading && (
        <GameWrapper sound={sound} onSoundToggle={toggleSound} />
      )};
      <Background opacity={loading ? 0.9 : 0.55} music={sound} />
    </div>
  );
};

export default App;

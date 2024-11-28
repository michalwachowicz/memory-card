import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import backgroundMusic from "@/Assets/audio/background.mp3";
import background720mp from "@/Assets/videos/background/background-720.mp4";
import background720webm from "@/Assets/videos/background/background-720.webm";
import background720jpg from "@/Assets/images/background/background-720.jpg";

import background1080mp from "@/Assets/videos/background/background-1080.mp4";
import background1080webm from "@/Assets/videos/background/background-1080.webm";
import background1080jpg from "@/Assets/images/background/background-1080.jpg";

interface Props {
  opacity: number;
  music: boolean;
}

const Background: React.FC<Props> = ({ opacity, music = false }) => {
  const musicRef = useRef<HTMLAudioElement>(null);

  const [size, setSize] = useState([0, 0]);
  const isSmall = size[0] <= 1280 || size[1] <= 720;

  const variant = {
    poster: isSmall ? background720jpg : background1080jpg,
    video: {
      mp4: isSmall ? background720mp : background1080mp,
      webm: isSmall ? background720webm : background1080webm,
    },
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const toggleMusic = async (play: boolean) => {
      if (musicRef.current === null) return;

      if (play) {
        musicRef.current.volume = 0.1;
        await musicRef.current.play();
      } else {
        musicRef.current.pause();
      }
    };

    toggleMusic(music);
  }, [music]);

  return (
    <div className="background">
      <div
        data-testid="backdrop"
        className="background-backdrop"
        style={{ opacity }}
      />

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        data-testid="video"
        className="background-video"
        poster={variant.poster}
        autoPlay
        muted
        loop
      >
        <source src={variant.video.webm} type="video/webm" />
        <source src={variant.video.mp4} type="video/mp4" />
      </video>

      {music && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          ref={musicRef}
          data-testid="audio"
          src={backgroundMusic}
          autoPlay
          loop
        />
      )}
    </div>
  );
};

export default Background;

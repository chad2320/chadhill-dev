import React, { useState, useEffect } from "react";
import graveEncounters from "../../assets/darksynth/grave-encounters.mp3";
import theDeadZone from "../../assets/darksynth/the-dead-zone.mp3";
import wrathChild from "../../assets/darksynth/wrath-child.mp3";
import { useGlobalAudioPlayer } from "react-use-audio-player";

interface Song {
  id: number;
  title: string;
  url: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "The Dead Zone",
    url: theDeadZone,
  },
  {
    id: 2,
    title: "Grave Encounters",
    url: graveEncounters,
  },
  {
    id: 3,
    title: "Wrath Child",
    url: wrathChild,
  },
  // Add more songs here
];

function MusicPlayer() {
  const { load, play, pause, paused } = useGlobalAudioPlayer();
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    load(songs[currentSongIndex].url, {
      autoplay: true,
      format: "mp3",
      onend: () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
      },
    });
  }, [currentSongIndex, load]);

  const playSong = () => {
    play();
  };

  const pauseSong = () => {
    pause();
  };

  const goToNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const goToPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Music Player</h1>
      <div className="mb-4">
        <span className=" mr-2 text-white">Now Playing:</span>
        <span className="text-white">{songs[currentSongIndex]?.title}</span>
      </div>
      <div className="mb-4 flex items-center justify-center">
        <button
          className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={goToPreviousSong}
        >
          Previous
        </button>
        {!paused ? (
          <button
            className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={pauseSong}
          >
            Pause
          </button>
        ) : (
          <button
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={playSong}
          >
            Play
          </button>
        )}
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={goToNextSong}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;

import React, { useEffect, useState } from "react";
import graveEncounters from "../../assets/darksynth/grave-encounters.mp3";
import theDeadZone from "../../assets/darksynth/the-dead-zone.mp3";
import wrathChild from "../../assets/darksynth/wrath-child.mp3";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Rnd } from "react-rnd";

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
  const { load, togglePlayPause, paused, duration, getPosition, seek } =
    useGlobalAudioPlayer();
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(1);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(getPosition());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    load(songs[currentSongIndex].url, {
      autoplay: true,
      format: "mp3",
      onend: () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
      },
    });
  }, [currentSongIndex, load]);

  const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = Number(e.target.value) / duration;
    seek(percent * duration);
    setPos(Number(e.target.value));
  };

  const goToNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const goToPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Rnd
      default={{ x: 0, y: 100, width: 180, height: 180 }}
      enableResizing={false}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <div className="flex h-[180px] w-[180px] flex-col  border-[1px] border-violet-500 bg-violet-400">
        <div className="handle h-[6px] w-full bg-violet-500" />
        <h1 className="mb-4 pl-1 font-chicago text-sm text-white">
          {songs[currentSongIndex]?.title}
        </h1>
        <div className="mb-3 flex h-[8px] w-full justify-between font-chicago text-xs text-white">
          <p className="">{formatTime(pos)}</p>
          <p>{formatTime(duration)}</p>
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={pos}
          onChange={scrub}
        />

        <div className="mb-4 mt-4 flex items-center justify-center">
          <button
            className="mr-2 rounded bg-blue-500 px-1 text-sm text-white hover:bg-blue-600"
            onClick={goToPreviousSong}
          >
            Previous
          </button>
          {!paused ? (
            <button
              className="mr-2 rounded bg-red-500 px-1 text-sm text-white hover:bg-red-600"
              onClick={() => togglePlayPause()}
            >
              Pause
            </button>
          ) : (
            <button
              className="mr-2 rounded bg-blue-500 px-1 text-sm text-white hover:bg-blue-600"
              onClick={() => togglePlayPause()}
            >
              Play
            </button>
          )}
          <button
            className="rounded bg-blue-500 px-1 text-sm text-white hover:bg-blue-600"
            onClick={goToNextSong}
          >
            Next
          </button>
        </div>
      </div>
    </Rnd>
  );
}

export default MusicPlayer;

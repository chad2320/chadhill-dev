import React, { useEffect, useState } from "react";
import graveEncounters from "../../assets/darksynth/grave-encounters.mp3";
import theDeadZone from "../../assets/darksynth/the-dead-zone.mp3";
import wrathChild from "../../assets/darksynth/wrath-child.mp3";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Rnd } from "react-rnd";
import { AudioSeekBar } from "./audioSeekBar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

interface Song {
  id: number;
  title: string;
  url: string;
  artist: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "The Dead Zone",
    url: theDeadZone,
    artist: "Karl Casey",
  },
  {
    id: 2,
    title: "Grave Encounters",
    url: graveEncounters,
    artist: "Karl Casey",
  },
  {
    id: 3,
    title: "Wrath Child",
    url: wrathChild,
    artist: "Karl Casey",
  },
  // Add more songs here
];

interface MusicPlayerProps {
  closePlayer: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ closePlayer }) => {
  const { load, togglePlayPause, pause, paused, duration, getPosition } =
    useGlobalAudioPlayer();
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [pos, setPos] = useState(0);

  function closePlayerAndPauseMusic() {
    closePlayer();
    pause();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(getPosition());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    load(songs[currentSongIndex].url, {
      autoplay: true,
      html5: true,
      format: "mp3",
      onend: () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
      },
    });
  }, [currentSongIndex, load]);

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
      default={{ x: 0, y: 100, width: 278, height: 198 }}
      enableResizing={false}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <div className="flex h-[198px] w-[278px] flex-col  border-[1px] border-violet-500 bg-violet-400">
        <div className="handle flex h-[20px] w-full cursor-grab flex-row bg-violet-500">
          <button
            onPointerDownCapture={closePlayerAndPauseMusic}
            className=" ml-[1px] mt-[1px] h-[16px] w-[16px] border-[1px] border-black p-0 font-chicago text-xs text-black"
          >
            X
          </button>
          <div className=" handle flex w-[200px] flex-col justify-between pl-2 pr-2">
            <div className="handle mt-[4px] h-[2px] w-full bg-black" />
            <div className="handle h-[1px] w-full bg-black" />
            <div className="handle mb-[5px] h-[3px] w-full bg-black" />
          </div>
          <h1 className="w-[80px] font-chicago text-sm text-black">Chad FM</h1>
        </div>
        <div className="mt-1 flex h-[40px] w-full items-center justify-center">
          <AudioSeekBar />
        </div>
        <div className="ml-4 mt-3 flex h-[8px] w-full justify-between font-chicago text-xs text-white">
          <p>
            {formatTime(pos)}/{formatTime(duration)}
          </p>
        </div>
        <h1 className="ml-4 mt-2 font-chicago text-sm text-white">
          {songs[currentSongIndex]?.title}
        </h1>
        <h2 className="ml-4 mt-1 font-chicago text-xs text-white">
          {songs[currentSongIndex]?.artist}
        </h2>
        <div className="m-2 h-[1px] w-[260px] rounded-sm  bg-black" />
        <div className="mb-2 mt-2 inline-flex w-full justify-center">
          <button
            className="rounded-l border-[1px] border-black bg-transparent px-1 text-sm text-white hover:bg-violet-500"
            onClick={goToPreviousSong}
          >
            <SkipPreviousIcon />
          </button>
          {!paused ? (
            <button
              className=" border-[1px] border-black bg-transparent px-1 text-sm text-white hover:bg-violet-500"
              onClick={() => togglePlayPause()}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className=" border-[1px] border-black bg-transparent px-1 text-sm text-white hover:bg-violet-500"
              onClick={() => togglePlayPause()}
            >
              <PlayArrowIcon />
            </button>
          )}
          <button
            className="rounded-r border-[1px] border-black bg-transparent px-1 text-sm text-white hover:bg-violet-500"
            onClick={goToNextSong}
          >
            <SkipNextIcon />
          </button>
        </div>
      </div>
    </Rnd>
  );
};

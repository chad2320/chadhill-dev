/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { RndWrapper } from "./components/browser/browser";
import { BrowserIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";
import { Clock } from "./components/clock";
import { InitialLoading } from "./components/loading/initialLoading";
import { motion } from "framer-motion";
import { inject } from "@vercel/analytics";
import { Background } from "./components/background/vortexBackground";
import { Background2 } from "./components/background/horizonBackground";
import { MusicPlayer } from "./components/musicPlayer/musicPlayer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useGlobalAudioPlayer } from "react-use-audio-player";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

inject();
export default function App() {
  const { playing, pause } = useGlobalAudioPlayer();
  const [loading, setLoading] = useState(false);
  const [backgroundNumber, setBackGroundNumber] = useState(3);
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(false);

  const managePlayer = () => {
    if (playing) {
      pause();
    }
    setMusicPlayerOpen(!musicPlayerOpen);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBackGroundNumber(Number(e.target.value));
  };

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const [rndWrappers, setRndWrappers] = useState<RndWrapperItem[]>([]);
  function handleClose(id: number) {
    setRndWrappers((prevRndWrappers) =>
      prevRndWrappers.filter((wrapper) => wrapper.id !== id)
    );
  }

  function handleAddRndWrapper(link: string) {
    const id = Math.floor(Math.random() * 10000);
    const newRndWrapper: RndWrapperItem = {
      id,
      component: (
        <RndWrapper
          key={id}
          handleClose={() => handleClose(id)}
          handleMoveToEnd={() => handleMoveToEnd(id)}
          link={link}
        />
      ),
    };
    setRndWrappers((prevRndWrappers) => [...prevRndWrappers, newRndWrapper]);
  }

  function handleMoveToEnd(id: number) {
    setRndWrappers((prevRndWrappers) => {
      const movedItemIndex = prevRndWrappers.findIndex(
        (wrapper) => wrapper.id === id
      );
      if (
        movedItemIndex !== -1 &&
        movedItemIndex !== prevRndWrappers.length - 1
      ) {
        const movedItem = prevRndWrappers[movedItemIndex];
        const updatedRndWrappers = [
          ...prevRndWrappers.slice(0, movedItemIndex),
          ...prevRndWrappers.slice(movedItemIndex + 1),
          movedItem,
        ];
        return updatedRndWrappers;
      }
      return prevRndWrappers;
    });
  }

  return (
    <div className=" h-screen w-screen overflow-hidden">
      {loading && <InitialLoading finishLoading={finishLoading} />}
      {!loading && (
        <div className="flex h-full w-full flex-col overflow-hidden  ">
          {backgroundNumber == 1 && <Background />}
          {backgroundNumber == 2 && <Background2 />}
          {backgroundNumber == 3 && (
            <div className="absolute z-[-1] h-full w-full bg-black" />
          )}

          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className=" flex h-5 w-full flex-row justify-between overflow-hidden bg-violet-500"
          >
            <select
              value={backgroundNumber}
              onChange={handleBackgroundChange}
              className="m-0 h-[18px] w-[80px] cursor-pointer bg-transparent p-0 font-chicago text-sm"
            >
              <option value={1}>Vortex</option>
              <option value={2}>Horizon</option>
              <option value={3}>Blank</option>
            </select>
            <div className="flex flex-row">
              <div>
                <div className="flex flex-row">
                  <div className=" m-0 mr-[2px] border-l-[1px] border-black pl-1 font-chicago text-sm ">
                    <button
                      onClick={managePlayer}
                      className=" flex items-center justify-center p-0 font-chicago text-xs text-black"
                    >
                      {musicPlayerOpen ? (
                        <VolumeUpIcon
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <VolumeOffIcon
                          style={{ width: "20px", height: "20px" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <Clock />
            </div>
          </motion.header>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={" h-[calc(100vh-20px)] w-full overflow-hidden "}
          >
            {musicPlayerOpen && (
              <MusicPlayer closePlayer={() => setMusicPlayerOpen(false)} />
            )}

            <AnimatePresence>
              {rndWrappers.map((rndWrapper) => (
                <React.Fragment key={rndWrapper.id}>
                  {rndWrapper.component}
                </React.Fragment>
              ))}
            </AnimatePresence>
            <BrowserIcon handleOpen={handleAddRndWrapper} />
          </motion.main>
        </div>
      )}
    </div>
  );
}

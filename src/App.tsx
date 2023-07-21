/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { GamesDemoIcon, MoviesDemoIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";
import { Clock } from "./components/clock";
import { InitialLoading } from "./components/initialLoading";
import { motion } from "framer-motion";
import { inject } from "@vercel/analytics";
import { Background } from "./components/background/background";
import { Background2 } from "./components/background/background copy";
import MusicPlayer from "./components/musicPlayer/musicPlayer";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

inject();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [backgroundNumber, setBackGroundNumber] = useState(1);

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
        <div className="flex h-screen w-screen flex-col overflow-hidden  ">
          {backgroundNumber == 1 && <Background />}
          {backgroundNumber == 2 && <Background2 />}
          {backgroundNumber == 3 && (
            <div className="absolute z-[-1] h-screen w-screen bg-black" />
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
              className="m-0 h-[18px] w-[80px] bg-transparent p-0 font-chicago text-sm"
            >
              <option value={1}>Vortex</option>
              <option value={2}>Horizon</option>
              <option value={3}>Blank</option>
            </select>

            <Clock />
          </motion.header>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={" h-[calc(100vh-20px)] w-full overflow-hidden "}
          >
            <MusicPlayer />

            <AnimatePresence>
              {rndWrappers.map((rndWrapper) => (
                <React.Fragment key={rndWrapper.id}>
                  {rndWrapper.component}
                </React.Fragment>
              ))}
            </AnimatePresence>
            <GamesDemoIcon handleOpen={handleAddRndWrapper} />
            <MoviesDemoIcon handleOpen={handleAddRndWrapper} />
          </motion.main>
        </div>
      )}
    </div>
  );
}

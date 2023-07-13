/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { GamesDemoIcon, MoviesDemoIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";
import { Clock } from "./components/clock";
import { InitialLoading } from "./components/initialLoading";
import { motion } from "framer-motion";
import { inject } from "@vercel/analytics";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

inject();
export default function App() {
  const [loading, setLoading] = useState(true);

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
  if (loading) {
    return <InitialLoading finishLoading={finishLoading} />;
  } else {
    return (
      <div className=" h-screen w-screen bg-black ">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex h-screen w-screen flex-col "
        >
          <header className=" flex h-5 w-full flex-row justify-between bg-violet-500">
            <div className="w-26">
              <p className="font-chicago text-sm">Chad Suite</p>
            </div>

            <Clock />
          </header>
          <main
            className={
              "h-[calc(100vh-20px)] w-full overflow-hidden bg-hero-pattern bg-cover"
            }
          >
            <AnimatePresence>
              {rndWrappers.map((rndWrapper) => (
                <React.Fragment key={rndWrapper.id}>
                  {rndWrapper.component}
                </React.Fragment>
              ))}
            </AnimatePresence>
            <GamesDemoIcon handleOpen={handleAddRndWrapper} />
            <MoviesDemoIcon handleOpen={handleAddRndWrapper} />
            {/* <TestIcon handleOpen={handleAddRndWrapper} /> */}
          </main>
        </motion.div>
      </div>
    );
  }
}

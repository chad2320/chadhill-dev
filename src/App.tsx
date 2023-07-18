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

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

inject();
export default function App() {
  const [loading, setLoading] = useState(true);
  //const [renderDesktop, setRenderDesktop] = useState(false);

  const finishLoading = () => {
    setTimeout(() => {
      console.log("loading true");
      setLoading(false);
    }, 2000);
  };

  /* useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      console.log("renderDesktop true");
      setRenderDesktop(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [loading]); */

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
          <Background />
          {/* <Background2 /> */}

          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className=" flex h-5 w-full flex-row justify-between overflow-hidden bg-violet-500"
          >
            <div className="w-26">
              <p className="font-chicago text-sm">Chad Suite</p>
            </div>

            <Clock />
          </motion.header>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={" h-[calc(100vh-20px)] w-full overflow-hidden "}
          >
            {/* <h1 className="backgroundText  font-chicago text-red-500">
              Chads Desktop Chads Desktop
            </h1> */}
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

/* if (loading) {
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
          
        </main>
      </motion.div>
    </div>
  );
} 
*/

import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { TestIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";
import { Clock } from "./components/clock";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

export default function App() {
  const [rndWrappers, setRndWrappers] = useState<RndWrapperItem[]>([]);
  function handleClose(id: number) {
    setRndWrappers((prevRndWrappers) =>
      prevRndWrappers.filter((wrapper) => wrapper.id !== id)
    );
  }

  function handleAddRndWrapper() {
    const id = Math.floor(Math.random() * 10000);
    const newRndWrapper: RndWrapperItem = {
      id,
      component: (
        <RndWrapper
          key={id}
          handleClose={() => handleClose(id)}
          handleMoveToEnd={() => handleMoveToEnd(id)}
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
    <div className="flex h-screen w-screen flex-col ">
      <header className=" flex h-5 w-full flex-row justify-between bg-violet-500">
        <p className="font-chicago text-sm">Chad Suite</p>
        <Clock />
      </header>
      <main
        className={"h-full w-full overflow-hidden bg-hero-pattern bg-cover"}
      >
        <AnimatePresence>
          {rndWrappers.map((rndWrapper) => (
            <React.Fragment key={rndWrapper.id}>
              {rndWrapper.component}
            </React.Fragment>
          ))}
        </AnimatePresence>
        <TestIcon handleOpen={handleAddRndWrapper} />
      </main>
    </div>
  );
}

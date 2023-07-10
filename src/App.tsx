import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { Footer } from "./components/footer";
import { TestIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

export default function App() {
  const [rndWrappers, setRndWrappers] = useState<RndWrapperItem[]>([]);

  function handleClose(id: number) {
    console.log("closing");
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
    <div className="min-w-screen flex min-h-screen flex-col ">
      <main className="flex-1 overflow-hidden bg-slate-700 bg-cover">
        <AnimatePresence>
          {rndWrappers.map((rndWrapper) => (
            <React.Fragment key={rndWrapper.id}>
              {rndWrapper.component}
            </React.Fragment>
          ))}
        </AnimatePresence>
        <TestIcon handleOpen={handleAddRndWrapper} />
      </main>
      <Footer />
    </div>
  );
}

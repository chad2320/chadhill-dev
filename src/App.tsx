import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { Footer } from "./components/footer";
import { TestIcon } from "./components/icons";
import { AnimatePresence } from "framer-motion";
import { useWindowSize } from "./utils/useWindowSize";

interface RndWrapperItem {
  id: number;
  component: React.ReactNode;
}

export default function App() {
  const [rndWrappers, setRndWrappers] = useState<RndWrapperItem[]>([]);
  const windowSize = useWindowSize();
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

  if (windowSize.width > 820) {
    return (
      <div className="flex h-screen w-screen flex-col ">
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
  } else {
    return (
      <div>
        <header className=" h-8 w-full bg-red-300">Header</header>
        <div className=" flex h-screen w-screen flex-col bg-slate-600">
          <AnimatePresence>
            {rndWrappers.map((rndWrapper) => (
              <React.Fragment key={rndWrapper.id}>
                {rndWrapper.component}
              </React.Fragment>
            ))}
          </AnimatePresence>
          <TestIcon handleOpen={handleAddRndWrapper} />
        </div>
      </div>
    );
  }
}

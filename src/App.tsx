import React, { useState } from "react";
import { RndWrapper } from "./components/rndWrapper";
import { Footer } from "./components/footer";
import { TestIcon } from "./components/icons";

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
    const id = rndWrappers.length + 1;
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
    <div className="flex h-screen w-screen flex-col">
      <main className="flex-1 bg-hero-pattern bg-cover">
        {rndWrappers.map((rndWrapper) => (
          <React.Fragment key={rndWrapper.id}>
            {rndWrapper.component}
          </React.Fragment>
        ))}
        <TestIcon handleOpen={handleAddRndWrapper} />
      </main>
      <Footer />
    </div>
  );
}

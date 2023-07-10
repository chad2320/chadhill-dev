import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context to hold the window size
interface WindowSizeContextProps {
  windowSize: { width: number; height: number };
  setWindowSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}
const WindowSizeContext = createContext<WindowSizeContextProps>(
  {} as WindowSizeContextProps
);

// Custom hook to get the window size
export const useWindowSize = (): { width: number; height: number } => {
  const { windowSize, setWindowSize } = useContext(WindowSizeContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initial window size
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowSize]);

  return windowSize;
};

interface WindowSizeProviderProps {
  children: React.ReactNode;
}

// Context provider to provide the window size to all components
export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <WindowSizeContext.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

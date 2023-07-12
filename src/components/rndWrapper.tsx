import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useWindowSize } from "../utils/useWindowSize";
import { set } from "animejs";

interface RndWrapperProps {
  handleClose: () => void;
  handleMoveToEnd: () => void;
  link: string;
}

export const RndWrapper: React.FC<RndWrapperProps> = ({
  handleClose,
  handleMoveToEnd,
  link,
}) => {
  //State for controlling the url input
  const [url, setUrl] = useState(link);
  const [urlInput, setUrlInput] = useState(link);
  const [history, setHistory] = useState<string[]>([link]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const navigateToUrl = (newUrl: string) => {
    setUrl(newUrl);
    setUrlInput(newUrl);
    setHistory((prevHistory) => [...prevHistory, url]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    console.log("history", history);
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUrl(history[currentIndex + 1]);
      setUrlInput(history[currentIndex + 1]);
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setUrl(history[currentIndex - 1]);
      setUrlInput(history[currentIndex - 1]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToUrl(urlInput);
    }
  };

  const windowSize = useWindowSize();

  const handleContainerMouseDown = () => {
    handleMoveToEnd();
  };
  //State for controlling Rnd. Which is neccesary for having a max size button.
  const [position, setPosition] = useState({
    x: 0,
    y: 40,
  });
  const [size, setSize] = useState({
    width: windowSize.width * 0.5,
    height: windowSize.height * 0.25,
  });
  const [maxed, setMaxed] = useState(true);
  const handleMaxed = () => {
    handleContainerMouseDown();
    setMaxed(!maxed);
  };

  useEffect(() => {
    if (position.x > 0) {
      const rightGap = windowSize.width - (position.x + size.width);
      /* console.log("windowsize", windowSize.width);
      console.log("rightgap", rightGap);
      console.log("position", position);
      console.log("size", size); */
      if (rightGap <= 20) {
        setPosition({ x: 0, y: windowSize.height * 0.5 });
      }
    }
  }, [windowSize]);

  return (
    <Rnd
      size={{
        width: maxed ? size.width : windowSize.width,
        height: maxed ? size.height : windowSize.height - 20,
      }}
      position={{
        x: maxed ? position.x : 0,
        y: maxed ? position.y : 0,
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResize={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition({ ...position });
      }}
      disableDragging={maxed ? false : true}
      enableResizing={maxed ? true : false}
      minWidth={200}
      minHeight={200}
      maxWidth={"100%"}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0, y: 50 }}
        whileHover={
          windowSize.width >= 820 ? (maxed ? { scale: 1.005 } : {}) : {}
        }
        className="h-full flex-col items-center justify-center rounded-sm border-2 border-violet-500 bg-white"
        onClick={handleContainerMouseDown}
      >
        <div className=" handle flex h-12 flex-col  bg-slate-500">
          <div className="ml-1 mr-1 mt-1 flex h-6 flex-row items-center justify-between">
            <div>
              <button onPointerDownCapture={handleBackward}>
                <ArrowBackIcon />
              </button>
              <button onPointerDownCapture={handleForward}>
                <ArrowForwardIcon />
              </button>
            </div>
            <div className="flex w-4/6">
              <input
                className="focus:shadow-outline h-5 w-full appearance-none rounded border py-2 pl-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                value={urlInput}
                onChange={handleUrlInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div>
              <button onPointerDownCapture={handleMaxed}>
                <FitScreenIcon />
              </button>
              <button onPointerDownCapture={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-row text-sm">
            <button
              className="border-1px ml-1 flex h-4 w-[80px] flex-row items-center justify-around rounded-lg border-violet-400 bg-slate-400 font-chicago"
              onClick={() => navigateToUrl("https://www.chadsgames.com")}
            >
              <img
                className="m-0 h-[4] w-4 rounded-lg p-0"
                src={require("../assets/gamesIcon.ico")}
                alt={":)"}
              />
              Games
            </button>
            <button
              className="border-1px ml-1 flex h-4 w-[80px] flex-row items-center justify-around rounded-lg border-violet-400 bg-slate-400 p-[2px] font-chicago"
              onClick={() => navigateToUrl("https://www.chadsmovies.com")}
            >
              <img
                className="m-0 h-[4] w-4 rounded-lg p-0"
                src={require("../assets/moviesIcon.ico")}
                alt={":)"}
              />
              Movies
            </button>
          </div>
        </div>

        <div className="flex h-full w-full flex-col">
          <iframe className=" h-full pb-12" src={url} />
        </div>
      </motion.div>
    </Rnd>
  );
};

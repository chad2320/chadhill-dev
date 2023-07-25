import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useWindowSize } from "../../utils/useWindowSize";
import { Spinner } from "../loading/spinner";
import { DefaultPage } from "./defaultPage";

interface RndWrapperProps {
  handleClose: () => void;
  handleMoveToEnd: () => void;
  link: string;
}

export const RndWrapper: React.FC<RndWrapperProps> = ({
  handleClose,
  handleMoveToEnd,
}) => {
  //State for controlling the url input
  const [url, setUrl] = useState("Home Page");
  const [urlInput, setUrlInput] = useState("Home Page");
  const [history, setHistory] = useState<string[]>(["Home Page"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navigating, setNavigating] = useState(true);

  useEffect(() => {
    if (navigating) {
      const timer = setTimeout(() => {
        setNavigating(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigating]);

  const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const navigateToUrl = (newUrl: string, incrementIndex: boolean) => {
    setNavigating(true);
    if (!newUrl.startsWith("https://") && newUrl !== "Home Page") {
      newUrl = `https://${newUrl}`;
    }
    setUrl(newUrl);
    setUrlInput(newUrl);
    if (incrementIndex) {
      const temp = [...history.slice(0, currentIndex + 1), newUrl];
      setHistory(temp);
      setCurrentIndex(temp.length - 1);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      navigateToUrl(history[currentIndex + 1], false);
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      navigateToUrl(history[currentIndex - 1], false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToUrl(urlInput, true);
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
    width: windowSize.width * 0.8,
    height: windowSize.height * 0.5,
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
      minWidth={280}
      minHeight={400}
      maxWidth={"100%"}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0, y: 50 }}
        /* whileHover={
          windowSize.width >= 820 ? (maxed ? { scale: 1.005 } : {}) : {}
        } */
        className="h-full flex-col items-center justify-center overflow-hidden rounded-sm border-2 border-violet-500 bg-black"
        onClick={handleContainerMouseDown}
      >
        <div className=" handle flex h-12 flex-col justify-around  bg-[#4B47DE]">
          <div className="ml-1 mr-1 mt-[1px] flex h-6 flex-row items-center justify-between">
            <div className="flex flex-row">
              <button
                onPointerDownCapture={handleBackward}
                className="text-xs text-white "
              >
                <ArrowBackIcon />
              </button>
              <button
                onPointerDownCapture={handleForward}
                className="text-white"
              >
                <ArrowForwardIcon />
              </button>
            </div>
            <div className="flex w-4/6">
              <input
                className="focus:shadow-outline h-5 w-full appearance-none rounded border border-[E050FA] bg-[#5078FA] py-2 pl-3 font-chicago text-sm  text-white shadow focus:outline-none"
                type="text"
                value={urlInput}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={handleUrlInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-row">
              <button onPointerDownCapture={handleMaxed} className="text-white">
                <FitScreenIcon />
              </button>
              <button onPointerDownCapture={handleClose} className="text-white">
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-row pb-1 pt-1 text-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className=" ml-1 flex h-4 flex-row items-center rounded-lg pr-1 font-chicago text-white hover:bg-white hover:bg-opacity-20 "
              onClick={() => navigateToUrl("https://chadsgames.com", true)}
            >
              <img
                className="m-0 mr-1 h-[4] w-4 rounded-lg p-0"
                src={require("../../assets/icons/gamesIcon.ico")}
                alt={":)"}
              />
              Games
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className=" ml-1 flex h-4 flex-row  items-center rounded-lg pr-1 font-chicago text-white hover:bg-white  hover:bg-opacity-20"
              onClick={() => navigateToUrl("https://chadsmovies.com", true)}
            >
              <img
                className="m-0 mr-1 h-[4] w-4 rounded-lg p-0"
                src={require("../../assets/icons/moviesIcon.ico")}
                alt={":)"}
              />
              Movies
            </motion.button>
          </div>
        </div>
        {navigating && (
          <motion.div className="flex h-full w-full flex-col items-center justify-center">
            <Spinner />
          </motion.div>
        )}
        <motion.div className="flex h-full w-full flex-col">
          {!navigating && url === "Home Page" && <DefaultPage />}
          {url !== "Home Page" && (
            <iframe
              className=" h-full pb-12"
              src={url}
              style={{ visibility: navigating ? "hidden" : "visible" }}
            />
          )}
        </motion.div>
      </motion.div>
    </Rnd>
  );
};

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useWindowSize } from "../utils/useWindowSize";

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
        width: maxed ? size.width : "100%",
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
        <div className=" handle flex h-6 flex-row items-center justify-between bg-slate-500">
          <div>
            {size.width} x {size.height}
            {/* <ArrowBackIcon />
            <ArrowForwardIcon /> */}
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
        <div className="flex h-full w-full flex-col">
          <iframe className=" h-full pb-6" src={link} />
        </div>
      </motion.div>
    </Rnd>
  );
};

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface RndWrapperProps {
  handleClose: () => void;
  handleMoveToEnd: () => void;
}

export const RndWrapper: React.FC<RndWrapperProps> = ({
  handleClose,
  handleMoveToEnd,
}) => {
  /* const grow = useSpring({
    transform: maxed ? "translate3d(0" : "",
  }); */
  const handleContainerMouseDown = () => {
    handleMoveToEnd();
  };
  //State for controlling Rnd. Which is neccesary for having a max size button.
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
  });
  const [size, setSize] = useState({
    width: 650,
    height: 200,
  });
  const [maxed, setMaxed] = useState(true);
  const handleMaxed = () => {
    setMaxed(!maxed);
  };

  return (
    <Rnd
      size={{
        width: maxed ? size.width : "100%",
        height: maxed ? size.height : "94%",
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
      minWidth={230}
      minHeight={190}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, width: size.width, height: size.height }}
        exit={{ opacity: 0, scale: 0, y: 50 }}
        whileHover={maxed ? { scale: 1.005 } : {}}
        className="h-full flex-col items-center justify-center border-2 border-red-600 bg-white"
        onClick={handleContainerMouseDown}
      >
        <div className=" handle flex h-10 flex-row items-center justify-between bg-slate-500">
          <div>
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
          <div>
            <button onClick={handleMaxed} className=" cursor-pointer">
              <FitScreenIcon />
            </button>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <motion.div
            className="h-20 w-20 bg-purple-950"
            whileHover={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
          />
        </div>
      </motion.div>
    </Rnd>
  );
};

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSpring, animated } from "@react-spring/web";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CloseIcon from "@mui/icons-material/Close";

interface RndWrapperProps {
  handleClose: () => void;
  handleMoveToEnd: () => void;
}

export const RndWrapper: React.FC<RndWrapperProps> = ({
  handleClose,
  handleMoveToEnd,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const fade = useSpring({
    color: isToggled ? "#000" : "green",
    transform: isToggled
      ? "translate3d(0, 15px, 0)"
      : "translate3d(0, 15px, 0)",
    fontSize: isToggled ? "2rem" : "3rem",
  });

  const handleContainerMouseDown = () => {
    handleMoveToEnd();
  };
  //State for controlling Rnd. Wich is neccesary for having a max size button.
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
      <div
        className="h-full w-full flex-col items-center justify-center border-2 bg-white"
        onMouseDown={handleContainerMouseDown}
      >
        <div className=" handle flex h-10 flex-row items-center justify-between bg-slate-500">
          <div>
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
          <div>
            <button onClick={handleMaxed}>
              <FitScreenIcon />
            </button>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div>
          <animated.h1 style={{ ...fade }}>Hello</animated.h1>
          <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
        </div>
      </div>
    </Rnd>
  );
};

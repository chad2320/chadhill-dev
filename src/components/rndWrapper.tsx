import React, { useState } from "react";
import { Rnd } from "react-rnd"; //https://github.com/bokuweb/react-rnd
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSpring, animated } from "@react-spring/web";
import FitScreenIcon from "@mui/icons-material/FitScreen";

export const RndWrapper = () => {
  const [isToggled, setIsToggled] = useState(false);
  const fade = useSpring({
    color: isToggled ? "#000" : "green",
    transform: isToggled
      ? "translate3d(0, 15px, 0)"
      : "translate3d(0, 15px, 0)",
    fontSize: isToggled ? "2rem" : "3rem",
  });

  //State for controlling Rnd. Wich is neccesary for having a max size button.
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [size, setSize] = useState({
    width: 650,
    height: 200,
  });
  const [maxed, setMaxed] = useState(false);
  const handleMaxed = () => {
    setMaxed(!maxed);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 650,
        height: 200,
      }}
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
      <div className=" w-fullitems-center h-full flex-col justify-center border-2 bg-white">
        <div className=" handle h-10 w-full flex-row justify-between bg-slate-200">
          <div className="flex h-full flex-row items-center justify-between bg-slate-500">
            <div className="">
              <ArrowBackIcon />
              <ArrowForwardIcon />
            </div>
            <div>
              <button onClick={handleMaxed}>
                <FitScreenIcon />
              </button>
            </div>
          </div>
          <div>
            <animated.h1 style={{ ...fade }}>Hello</animated.h1>
            <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

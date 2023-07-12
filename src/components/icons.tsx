import React from "react";

interface IconProps {
  handleOpen: (link: string) => void;
}

export const TestIcon: React.FC<IconProps> = ({ handleOpen }) => {
  return (
    <button onClick={() => handleOpen("http://chadsmovies.com/")}>
      <div className=" m-2 flex h-14 w-14 items-center justify-center bg-slate-400">
        <span className=" text-xl font-bold"> Test</span>
      </div>
    </button>
  );
};

export const GamesDemoIcon: React.FC<IconProps> = ({ handleOpen }) => {
  return (
    <button onClick={() => handleOpen("https://chadsgames.com")}>
      <div className="h-18 w-18 m-2 flex flex-col items-center justify-center">
        <img src={require("../assets/gamesIcon.ico")} alt=":(" />
        <span className=" font-chicago text-xs text-white">Chads Games</span>
      </div>
    </button>
  );
};

export const MoviesDemoIcon: React.FC<IconProps> = ({ handleOpen }) => {
  return (
    <button onClick={() => handleOpen("https://chadsmovies.com")}>
      <div className="h-18 w-18 m-2 flex flex-col items-center justify-center">
        <img src={require("../assets/moviesIcon.ico")} alt=":(" />
        <span className=" font-chicago text-xs text-white">Chads Movies</span>
      </div>
    </button>
  );
};

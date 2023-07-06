import React from "react";

interface IconProps {
  handleOpen: () => void;
}

export const TestIcon: React.FC<IconProps> = ({ handleOpen }) => {
  return (
    <button onClick={handleOpen}>
      <div className=" m-2 flex h-14 w-14 items-center justify-center bg-slate-400">
        <span className=" text-xl font-bold"> Test</span>
      </div>
    </button>
  );
};

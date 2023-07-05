import React from "react";
import { Rnd } from "react-rnd"; //https://github.com/bokuweb/react-rnd
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const RndWrapper = () => {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 650,
        height: 200,
      }}
      minWidth={230}
      minHeight={190}
      bounds="parent"
      dragHandleClassName="handle"
    >
      <div className=" w-fullitems-center h-full flex-col justify-center border-2 bg-white">
        <div className=" handle h-10 w-full flex-row justify-between bg-slate-200">
          <div className="h-full flex-row items-center bg-slate-500">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
        </div>
        <div className="  p-4">
          <strong>Chad Hill</strong> <small>@chad2320</small> <small>31m</small>
          <br />
          <p className=" break-normal">
            This is a test of how the Rnd component works. Seems to work pretty
            good.
          </p>
        </div>
      </div>
    </Rnd>
  );
};

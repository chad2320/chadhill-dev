import React from "react";
import { Rnd } from "react-rnd";
//https://github.com/bokuweb/react-rnd

export default function App() {
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
      bounds="window"
    >
      <div className=" flex h-full w-full items-center justify-center border-2">
        <div className=" p-4">
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
}

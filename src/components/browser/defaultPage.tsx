import React, { useEffect, useState, useRef } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

export const DefaultPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    //Get main divs width to properly set flex direction
    const handleResize = () => {
      // Get the width of the component
      const componentWidth = ref.current?.getBoundingClientRect().width || 0;

      // Change the flex direction based on the component width
      setWide(componentWidth < 800 ? false : true);
    };

    // Call the handleResize function immediately to set the initial flex direction
    handleResize();
    // Add a listener to detect changes in the component width
    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div
      ref={ref}
      className=" no-scrollbar flex h-full w-full flex-col items-center overflow-y-scroll bg-gradient-to-t from-[#0e1b3e] to-slate-900 to-50%"
    >
      <div
        className={` m-4 flex h-auto w-[90%] items-center justify-center  ${
          wide ? "flex-row" : "flex-col"
        }`}
      >
        <div className={` flex h-full w-[40%] items-center justify-center `}>
          <img
            className={` max-h-[100%] w-auto rounded-full`}
            src={require("../../assets/images/chad.jpeg")}
            alt={":)"}
          />
        </div>
        <div
          className={` ${
            wide ? "w-[50%]" : "w-[95%]"
          } m-2 flex h-full  flex-col items-center rounded-md bg-gradient-to-b  from-[#293d5b] to-[#1f2d41] px-2`}
        >
          <h1 className=" m-2 font-chicago text-2xl text-white">
            {/* eslint-disable-next-line */}
            Welcome to my website! I'm Chad, a full stack developer from the
            Renton area.
          </h1>
          <div className=" h-[1px] w-[80%] bg-black" />
          <p className=" m-2 font-chicago text-lg text-white">
            {/* eslint-disable-next-line */}
            This desktop site is just my creative way of showing off my skills
            and projects. Which you can checkout below!
          </p>
          <p>{/* eslint-disable-next-line */}</p>
          <div className="flex h-full w-full flex-row items-end justify-end pb-2">
            <div className=" rounded-lg border-2 border-slate-700 bg-purple-800 p-[3px]">
              <p className="font-chicago text-white">
                Status:&nbsp;
                <span className="text-green-500">Looking for dev work</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-12 flex h-auto w-full flex-col items-center px-4">
        <div className=" min-h-20 mb-2 flex w-[100%] max-w-[800px] flex-col items-center rounded-md  bg-gradient-to-t from-slate-800 to-slate-700">
          <div className=" flex w-full flex-row items-center justify-between">
            <h1 className="ml-2 font-chicago text-xl text-white">
              Chads Data Tabler
            </h1>
            <div className="m-2 flex flex-row items-center">
              <h1 className="font-chicago text-white">Github:&nbsp;</h1>
              <button
                className="rounded-sm p-[1px] text-white hover:bg-slate-500 "
                onClick={() =>
                  window.open("https://github.com/chad2320/Chads-Data-Tabler")
                }
              >
                <LaunchIcon />
              </button>
            </div>
          </div>
          <div className="m-[3px] h-[2px] w-4/5 bg-black" />
          <div className="flex w-full items-center justify-between">
            <div>
              <h1 className="w-[40%] p-2 font-chicago text-sm text-white">
                Project for formatting and displaying data in a table with
                working filters. Typically for checking webscraping project
                data.
              </h1>
            </div>
          </div>
        </div>
        <div className=" mb-2 h-20 w-[100%] max-w-[800px] bg-slate-300"></div>
        <div className=" mb-2 h-20 w-[100%] max-w-[800px] bg-slate-300"></div>
        <div className=" mb-2 h-20 w-[100%] max-w-[800px] bg-slate-300"></div>
      </div>
    </div>
  );
};

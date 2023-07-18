import React from "react";
import { motion } from "framer-motion";

export const Vortex = () => {
  const duration = 20;
  const interval = 0.5;
  const sunChild = {
    visible: (i: number) => ({
      scale: [1.5, 0],
      opacity: [0, 0.5, 0.7, 0.2],
      borderRadius: ["30%", "50%"],
      rotate: [0, 720],
      transition: {
        duration: duration,
        repeat: Infinity,
        delay: i * interval - duration,
      },
    }),
    hidden: { opacity: 0, scale: 1 },
  };

  const beamCount = Math.round(duration / interval);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
      className="absolute flex h-60 w-60 items-center  justify-center rounded-full bg-gradient-radial from-violet-900 via-violet-700 to-violet-500"
    >
      <div className="relative h-full w-full items-center justify-center overflow-hidden rounded-full">
        {Array.from(Array(beamCount).keys()).map((i) => (
          <motion.div
            custom={i}
            key={i}
            animate="visible"
            variants={sunChild}
            className="top-0/2 absolute z-0 h-60 w-60  border-8 border-[#2e1065]  bg-transparent"
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Background = () => {
  const fadeInAnimation = {
    hidden: {},
    visible: {
      background: [
        "linear-gradient(to right,black 15%, skyblue 45%,skyblue 55%, black 85%)",
        "linear-gradient(to right,black 0%, skyblue 30%,skyblue 70%, black 100%)",
        "linear-gradient(to right,black 15%, skyblue 45%,skyblue 55%, black 85%)",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        delay: 4,
      },
    },
  };
  const variant1 = {
    visible: (i: number) => ({
      y: [0, 100],
      transition: {
        duration: 10,
        repeat: Infinity,
        delay: i * 2 - 10,
      },
    }),
    hidden: {},
  };

  return (
    <motion.div
      className=" absolute z-[-1] m-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, backgroundColor: "#000000" }}
      animate={{
        opacity: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, backgroundColor: "#000000" }}
        animate={{
          opacity: 1,
          background: "radial-gradient(200px circle, skyblue 0%, black 100%)",
        }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute h-screen w-screen"
      />
      <Vortex />
      <motion.div className="flex items-center justify-center">
        <motion.div
          animate={{
            opacity: [0, 1],
            y: 20,
            rotateX: 40,
            transformPerspective: 30,
          }}
          transition={{
            delay: 2,
            duration: 2,
          }}
          className=" z-50 h-[95px] w-[90px] border-l-[1px] border-r-[1px] border-violet-900 bg-gradient-to-t from-indigo-500 from-30%"
        >
          {Array.from(Array(5).keys()).map((i) => (
            <motion.div
              custom={i}
              key={i}
              initial="hidden"
              animate="visible"
              variants={variant1}
              className="absolute h-[11px] w-full border-b-[0.1px] border-t-[1px] border-violet-500 bg-transparent"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

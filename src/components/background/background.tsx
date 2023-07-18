import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Vortex } from "./vortex";

export const Background = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
      className=" relative m-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInAnimation}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: "#000000",
      }}
    >
      <motion.div
        initial={{ opacity: 0, backgroundColor: "#000000" }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute inset-0 z-0 m-0 h-full w-full bg-gradient-to-t from-black from-40% via-sky-500 via-50% to-black to-60%"
      ></motion.div>

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
          className=" z-50 h-[95px] w-[60px] border-l-[1px] border-r-[1px] border-violet-900 bg-gradient-to-t from-indigo-500 from-30%"
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

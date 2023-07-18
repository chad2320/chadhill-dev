import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Vortex } from "./vortex";

export const Background = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const container = {
    perspective: "100px",
    transform:
      "translate3d(-50%, -50%, 0) rotate3d(1, 0, 0, 55deg) rotate3d(0, 0, 1, 45deg)",
  };
  const interval = 0.5;
  const duration = 10;
  const planetRings = {
    visible: (i: number) => ({
      scale: [1, 2],
      y: [0, 800],
      width: [40, 500],
      opacity: [0, 1, 1, 1, 1, 1],
      borderBottom: ["none", "100px solid #2e1065"],
      borderLeft: ["none", "30px solid transparent"],
      borderRight: ["none", "30px solid transparent"],
      perpsective: 1000,
      rotateX: [0, 180],
      transformOrigin: "top",
      transition: {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        delay: i * (duration / beamCount),
      },
    }),
    hidden: {
      opacity: 0,
      scale: 1,
      borderBottom: ["none"],
      borderLeft: ["none"],
      borderRight: ["none"],
    },
  };

  const beamCount = Math.round(duration / interval);

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
          background: [
            "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
          ],
        }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute inset-0 z-0 m-0 h-full w-full"
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
          <div>
            <AnimatePresence>
              {Array.from(Array(5).keys()).map((i) => (
                <motion.div
                  initial={{ y: 0 }}
                  key={i}
                  animate={{
                    y: [0, 100],
                  }}
                  transition={{
                    duration: 10,
                    delay: i * 2 - 10,
                    repeat: Infinity,
                  }}
                  className="absolute h-[11px] w-full border-b-[0.1px] border-t-[1px] border-violet-500 bg-transparent"
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

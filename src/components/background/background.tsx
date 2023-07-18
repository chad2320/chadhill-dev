import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Vortex } from "./vortex";

export const Background = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
      className=" relative m-0 flex h-screen w-screen flex-col items-center justify-end"
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
      <motion.div className="absolute left-1/2 top-1/2">
        <AnimatePresence>
          {Array.from(Array(beamCount).keys()).map((i) => (
            <motion.div
              custom={i}
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={planetRings}
              className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

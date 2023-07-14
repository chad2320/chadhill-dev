import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "../../utils/useWindowSize";
import { Vortex } from "./vortex";

export const Background = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const { width, height } = useWindowSize();

  const interval = 2.5;
  const duration = 60;
  const planetRings = {
    visible: (i: number) => ({
      y: [-10, 1500],
      opacity: [0.4, 1, 1, 1, 1],
      height: [2, 3],
      shadow: [
        "35px 35px 35px 35px rgba(255, 0, 140, 0.5)",
        "0px 0px 0px 0px rgba(119, 0, 255, 0.5)",
      ],
      transition: {
        ease: "linear",
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
    </motion.div>
  );
};

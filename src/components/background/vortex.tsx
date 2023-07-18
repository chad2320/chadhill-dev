import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Vortex = () => {
  const duration = 21;
  const interval = 0.3;
  const sunChild = {
    visible: (i: number) => ({
      scale: [1.5, 0],
      opacity: [0, 0.5, 0.7, 0.2],
      borderColor: ["#2e1065"],
      borderWidth: [4, 6],
      borderRadius: ["30%", "45%"],
      rotate: [0, 720],
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
      className="absolute flex h-60 w-60 items-center  justify-center rounded-full bg-violet-600"
    >
      <div className="relative h-full w-full items-center justify-center overflow-hidden rounded-full">
        <AnimatePresence>
          {Array.from(Array(beamCount).keys()).map((i) => (
            <motion.div
              custom={i}
              key={i}
              animate="visible"
              variants={sunChild}
              className="top-0/2 absolute z-0 h-60 w-60  border-4  bg-transparent"
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

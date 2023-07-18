import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Background2 = () => {
  const container = {
    perspective: "100px",
    transform:
      "translate3d(-50%, -50%, 0) rotate3d(1, 0, 0, 55deg) rotate3d(0, 0, 1, 45deg)",
  };

  const interval = 3;
  const variant1: { visible: (i: number) => any; hidden: any } = {
    visible: (i: number) => ({
      rotateX: [0, 360],
      transition: {
        delay: i * interval - 20,
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    hidden: { opacity: 0, scale: 1 },
  };

  return (
    <motion.div className="absolute z-[-1] h-screen w-screen overflow-hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        style={container}
        className="absolute left-[50%] top-[50%] z-0 flex flex-col  items-center justify-center"
      >
        <div>Chads Proficiencies</div>
        <AnimatePresence>
          {Array.from(Array(10).keys()).map((i) => (
            <motion.div
              custom={i}
              key={i}
              animate="visible"
              variants={variant1}
              className="m-3 h-[200px] w-10 rounded-lg bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500"
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

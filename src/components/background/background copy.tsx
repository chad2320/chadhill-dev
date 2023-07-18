import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Background2 = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const variant1 = {
    visible: (i: number) => ({
      y: [40, 700],
      transition: {
        duration: 20,
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

      <motion.div className="flex items-center justify-center">
        <motion.div
          animate={{
            opacity: [0, 1],
            y: 20,
            rotateX: 30,
            transformPerspective: 100,
          }}
          transition={{
            delay: 2,
            duration: 2,
          }}
          className=" z-50 h-[500px] w-[250vw] border-l-[1px] border-r-[1px] border-violet-900 bg-gradient-to-t from-indigo-700 from-90%"
        >
          <AnimatePresence>
            {Array.from(Array(20).keys()).map((i) => (
              <motion.div
                custom={i}
                key={i}
                initial="hidden"
                animate="visible"
                variants={variant1}
                className="absolute h-[50px] w-[5000px] border-b-[1px] border-t-[1px] border-yellow-300 bg-transparent"
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

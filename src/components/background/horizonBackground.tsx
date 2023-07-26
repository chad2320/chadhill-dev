import React from "react";
import { motion } from "framer-motion";

export const Background2 = () => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const variant1 = {
    visible: (i: number) => ({
      y: [40, 700],
      opacity: [0, 1],
      transition: {
        repeatDelay: 2,
        duration: 20,
        repeat: Infinity,
        delay: i * 2 - 10,
      },
    }),
    hidden: {},
  };

  const variant2 = {
    visible: (i: number) => ({
      scale: [0, 1.3],
      opacity: 0.3,
      transition: {
        duration: 30,
        repeat: Infinity,
        delay: i * 5 - 10,
      },
    }),
    hidden: {},
  };

  return (
    <motion.div
      className=" absolute z-[-1] m-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black"
      initial="hidden"
      animate="visible"
      variants={fadeInAnimation}
    >
      <motion.div
        className=" absolute  z-[22] h-[250px] w-[250px]  overflow-hidden rounded-full bg-gradient-to-t from-yellow-500 via-orange-500  to-red-500 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 3.5 }}
      >
        {Array.from(Array(6).keys()).map((i) => (
          <motion.div
            custom={i}
            key={i}
            initial="hidden"
            animate="visible"
            variants={variant2}
            className="absolute h-[250px] w-[250px] rounded-full border-[15px] border-yellow-300 bg-transparent"
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, backgroundColor: "#000000" }}
        animate={{
          opacity: 1,
          background:
            "radial-gradient(200px circle, yellow 0%, transparent 100%)",
        }}
        transition={{ duration: 3, delay: 4 }}
        className="absolute z-[21] h-screen w-screen"
      />
      <motion.div
        initial={{ opacity: 0, backgroundColor: "#000000" }}
        animate={{
          opacity: 1,
          background:
            "linear-gradient(180deg, transparent 45%, rgba(255, 255, 0, 0.4) 50%, transparent 55%)",
        }}
        transition={{ duration: 3, delay: 4 }}
        className="absolute z-[80] h-screen w-screen"
      />
      <motion.div
        animate={{
          opacity: [0, 1],
          rotateX: 45,
          y: 150,
          transformPerspective: 200,
        }}
        transition={{
          delay: 2,
          duration: 1,
        }}
        className=" absolute z-50   h-[500px] w-[250vw] justify-center overflow-hidden border-l-[1px] border-r-[1px] border-violet-900 bg-gradient-to-t from-indigo-700 from-90%"
      >
        {Array.from(Array(15).keys()).map((i) => (
          <motion.div
            custom={i}
            key={i}
            initial="hidden"
            animate="visible"
            variants={variant1}
            className="absolute h-[50px] w-[5000px] border-b-[1px] border-t-[1px] border-yellow-300 bg-transparent"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

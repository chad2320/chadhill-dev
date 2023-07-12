import React, { useState } from "react";
import { motion } from "framer-motion";

interface HeroAnimation {
  size: {
    width: number;
    height: number;
  };
}

export const HeroAnimation: React.FC<HeroAnimation> = ({ size }) => {
  const [move, setMove] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      <motion.li className="h-10 w-10 rounded-full bg-black" variants={item} />
      <motion.li className="h-10 w-10 rounded-full bg-black" variants={item} />
    </motion.ol>
  );
};

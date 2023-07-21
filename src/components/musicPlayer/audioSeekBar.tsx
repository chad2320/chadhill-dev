import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
  MouseEvent,
} from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { motion } from "framer-motion";

interface AudioSeekBarProps {
  className?: string;
}

export const AudioSeekBar: FunctionComponent<AudioSeekBarProps> = () => {
  const { playing, getPosition, duration, seek } = useGlobalAudioPlayer();
  const [pos, setPos] = useState(0);
  const frameRef = useRef<number>();

  const seekBarElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition]);

  const goTo = useCallback(
    (event: MouseEvent) => {
      if (seekBarElem.current) {
        const rect = seekBarElem.current.getBoundingClientRect();
        const eventOffsetX = event.pageX - rect.left;
        const elementWidth = rect.width;
        const percent = eventOffsetX / elementWidth;
        const newPosition = percent * duration;
        seek(newPosition);

        // Update the 'pos' state to match the new position
        setPos(newPosition);
      }
    },
    [duration, seek]
  );

  // Array to store the heights of the rectangles
  const [rectangleHeights, setRectangleHeights] = useState<number[]>(
    Array.from({ length: 50 }, () => 20)
  );
  // Function to generate random heights between 10 and 35
  const getRandomHeight = (): number => {
    return Math.floor(Math.random() * 26) + 10;
  };

  useEffect(() => {
    // Start the animation when playing is true
    if (playing) {
      const intervalId = setInterval(updateRectangles, 2000); // Change the interval as needed
      return () => clearInterval(intervalId);
    } else {
      setRectangleHeights(Array.from({ length: 50 }, () => 20));
    }
  }, [playing]);

  // Function to update the rectangleHeights array with random heights
  const updateRectangles = () => {
    const heights = Array.from({ length: 50 }, () => getRandomHeight());
    setRectangleHeights(heights);
  };

  if (duration === Infinity) return null;

  return (
    <div
      className={` h-[40px] w-[270px] rounded-sm bg-black `}
      ref={seekBarElem}
      onClick={goTo}
    >
      <div
        style={{ width: `${(pos / duration) * 100}%` }}
        className="absolute h-[40px]"
      />
      <div className="flex h-full w-full flex-row items-center justify-between">
        {rectangleHeights.map((height, index) => (
          <motion.div
            key={index}
            className={`mx-px h-full w-[3px] ${
              index < (pos / duration) * 50 ? "bg-violet-500" : "bg-violet-300"
            }`}
            animate={
              index < (pos / duration) * 50
                ? { opacity: 1, height: height }
                : { opacity: 1, height: height / 3 }
            }
            transition={{ duration: 2 }}
          />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import click1 from "../assets/audio/click1.mp3";
import click2 from "../assets/audio/click2.mp3";
import click3 from "../assets/audio/click3.mp3";
import click4 from "../assets/audio/click4.mp3";

import {
  chad,
  keyboardInitial,
  keyboard1,
  keyboard2,
  keyboard3,
  keyboard4,
  keyboard5,
  keyboard6,
  keyboard7,
  keyboard8,
} from "../assets/ascii";

interface TypewriterProps {
  text: string;
  speed: number;
  loop: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed,
  loop,
}) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const length = displayText.length;
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, length + 1));
      } else if (loop) {
        setDisplayText("");
      } else {
        setDisplayText(text);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText]);

  return <span>{displayText}</span>;
};

interface TextSectionProps {
  stop: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ stop }) => {
  if (stop === "grabbing") {
    return (
      <div className="h-4 font-chicago text-sm text-white">
        {<Typewriter text={"Grabbing Chad"} speed={50} loop={false} />}
        {<Typewriter text={"..."} speed={100} loop={true} />}
      </div>
    );
  } else if (stop === "arrived") {
    return (
      <div className=" h-4 font-chicago text-sm text-white">
        Chads Logging You In{" "}
        {<Typewriter text={"..."} speed={100} loop={true} />}
      </div>
    );
  } else {
    return (
      <div className=" h-4 font-chicago text-sm text-white">
        Have fun! - Chad
      </div>
    );
  }
};

interface InitialLoadingProps {
  finishLoading: () => void;
}

export const InitialLoading: React.FC<InitialLoadingProps> = ({
  finishLoading,
}) => {
  const [loadingChad, setLoadingChad] = useState("");
  const [chadLoaded, setChadLoaded] = useState("grabbing");
  const [haveKeyboard, setHaveKeyboard] = useState(false);
  const [keyboard, setKeyboard] = useState(keyboardInitial);
  const [previousRandom, setPreviousRandom] = useState<number>(0);
  const userFull = "Chadwick";
  const [user, setUser] = useState<string>("");
  const passwordFull = "Password123";
  const [password, setPassword] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);
  const [initialDelay, setInitialDelay] = useState<boolean>(false);
  const [keyboardExtraWait, setKeyboardExtraWait] = useState<boolean>(false);
  const [calledChad, setCalledChad] = useState<boolean>(false);
  const clickArray = [click1, click2, click3, click4];

  const playBite = () => {
    new Audio(clickArray[Math.floor(Math.random() * 4)]).play();
  };

  const keyboardArray = [
    keyboard1,
    keyboard2,
    keyboard3,
    keyboard4,
    keyboard5,
    keyboard6,
    keyboard7,
    keyboard8,
  ];

  //Once Call Chad Button Is Clicked. Start The Login Sequence
  useEffect(() => {
    if (calledChad) {
      const timer = setTimeout(() => {
        setInitialDelay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [calledChad]);

  //Handle whether or not Chad Image has been loaded
  useEffect(() => {
    if (initialDelay) {
      if (loadingChad.length < chad.length) {
        const timer = setTimeout(() => {
          const length = loadingChad.length;
          setLoadingChad(chad.slice(0, length + 1));
        }, 1);
        return () => clearTimeout(timer);
      } else if (chadLoaded === "grabbing") {
        const timer = setTimeout(() => {
          setChadLoaded("arrived");
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  });

  //When Chad Is Loaded, add keyboard render
  useEffect(() => {
    if (chadLoaded === "arrived") {
      const timer = setTimeout(() => {
        setHaveKeyboard(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [chadLoaded]);

  //When keyboard is rendered, start the keyboard animation
  useEffect(() => {
    if (haveKeyboard) {
      const timer = setTimeout(() => {
        setKeyboardExtraWait(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [haveKeyboard]);

  //Handle Rendering updating Keyboard
  useEffect(() => {
    if (finished) {
      setKeyboard(keyboardInitial);
      return;
    }
    if (keyboardExtraWait) {
      const timer = setTimeout(() => {
        const userLength = user.length;
        const passwordLength = password.length;
        let randomNumber = Math.floor(Math.random() * 8);
        if (previousRandom === randomNumber) {
          if (randomNumber === 7) {
            randomNumber--;
          } else randomNumber++;
        }
        if (userFull.length !== userLength) {
          setUser(userFull.slice(0, userLength + 1));
          playBite();
        } else if (passwordFull.length !== passwordLength) {
          setPassword(passwordFull.slice(0, passwordLength + 1));
          playBite();
        } else {
          setFinished(true);
          setChadLoaded("finished");
          finishLoading();
        }
        setPreviousRandom(randomNumber);
        setKeyboard(keyboardArray[randomNumber]);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [haveKeyboard, keyboard, keyboardExtraWait]);

  //Playing the login animation
  return (
    <div className="h-screen w-screen bg-black">
      {!calledChad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 2 }}
        >
          <p className="font-chicago text-lg text-white">
            Looks Like You Are Requesting Access To Chads Desktop.
          </p>
          <button
            onClick={() => setCalledChad(true)}
            className="rounded-md border border-white p-1 font-chicago text-[10px] text-white"
          >
            Click To Call Chad
          </button>
        </motion.div>
      )}
      {calledChad && (
        <div>
          <TextSection stop={chadLoaded} />
          <pre className="text-[8px] text-white ">{loadingChad}</pre>
          {haveKeyboard && (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-[8px] text-white "
            >
              {keyboard}
            </motion.pre>
          )}
          {haveKeyboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className=" bg-black"
            >
              <div className="w-30  font-chicago text-[10px] text-white">
                Username: {user}
              </div>
              <div className="w-34  font-chicago text-[10px] text-white">
                Password: {password}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        Log In Succesful
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelay(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  //When Chad Is Loaded, add keyboard
  useEffect(() => {
    if (chadLoaded === "arrived") {
      const timer = setTimeout(() => {
        setHaveKeyboard(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chadLoaded]);

  useEffect(() => {
    if (haveKeyboard) {
      const timer = setTimeout(() => {
        setKeyboardExtraWait(true);
      }, 1000);
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
        } else if (passwordFull.length !== passwordLength) {
          setPassword(passwordFull.slice(0, passwordLength + 1));
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

  return (
    <div className="h-screen w-screen bg-black">
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
  );
};

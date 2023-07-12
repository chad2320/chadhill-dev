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
import { set } from "animejs";

interface TypewriterProps {
  text: string;
  speed: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const length = displayText.length;
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, length + 1));
      } else setDisplayText("");
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText]);

  return <span>{displayText}</span>;
};

export const TextSection = ({ stop }: { stop: boolean }) => {
  if (!stop) {
    return (
      <div className="h-4 font-chicago text-sm text-white">
        {<Typewriter text={"Grabbing Chad..."} speed={100} />}
      </div>
    );
  } else {
    return (
      <div className=" h-4 font-chicago text-sm text-green-700">
        Chads Logging You In {<Typewriter text={"..."} speed={100} />}
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
  const [chadLoaded, setChadLoaded] = useState(false);
  const [haveKeyboard, setHaveKeyboard] = useState(false);
  const [keyboard, setKeyboard] = useState(keyboardInitial);
  const [previousRandom, setPreviousRandom] = useState<number>(0);
  const userName = "Chadwick";
  const [user, setUser] = useState<string>("");
  const passwordName = "Password123";
  const [password, setPassword] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);

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
    if (loadingChad.length < chad.length) {
      const timer = setTimeout(() => {
        const length = loadingChad.length;
        setLoadingChad(chad.slice(0, length + 1));
      }, 1);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setChadLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    if (chadLoaded) {
      const timer = setTimeout(() => {
        setHaveKeyboard(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chadLoaded]);

  useEffect(() => {
    if (finished) {
      setKeyboard(keyboardInitial);
      return;
    }
    if (haveKeyboard) {
      const timer = setTimeout(() => {
        const userLength = user.length;
        const passwordLength = password.length;
        let randomNumber = Math.floor(Math.random() * 8);
        if (previousRandom === randomNumber) {
          if (randomNumber === 7) {
            randomNumber--;
          } else randomNumber++;
        }
        if (userName.length !== userLength) {
          setUser(userName.slice(0, userLength + 1));
        } else if (passwordName.length !== passwordLength) {
          setPassword(passwordName.slice(0, passwordLength + 1));
        } else {
          console.log("done");
          setFinished(true);
          setTimeout(() => {
            finishLoading();
          }, 300);
        }
        setPreviousRandom(randomNumber);
        setKeyboard(keyboardArray[randomNumber]);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [haveKeyboard, keyboard]);

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

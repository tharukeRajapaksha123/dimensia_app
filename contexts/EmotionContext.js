import { createContext, useState } from "react";

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const emotionSetter = (emotion) => {
    setCurrentEmotion(emotion);
    console.log("emption setted");
  };
  return (
    <EmotionContext.Provider value={{ currentEmotion, emotionSetter }}>
      {children}
    </EmotionContext.Provider>
  );
};

import React, { createContext, useState, ReactNode } from "react";

interface ProgressContextProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const ProgressContext = createContext<ProgressContextProps | undefined>(
  undefined
);

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

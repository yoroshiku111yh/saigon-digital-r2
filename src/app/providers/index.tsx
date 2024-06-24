"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface TypeContext {
  isOpenSearch: boolean;
  setIsOpenSearch: (isOpenSearch: boolean) => void;
  isPauseScrollSection: boolean;
  setIsPauseScrollSection: (isPause: boolean) => void;
  isMobile : boolean;
}

const ContextCommon = createContext<null | TypeContext>(null);

export const ContextCommonProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPauseScrollSection, setIsPauseScrollSection] =
    useState<boolean>(false);
    useEffect(() => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      }
    }, []);
  return (
    <ContextCommon.Provider
      value={{
        isOpenSearch,
        setIsOpenSearch,
        isPauseScrollSection,
        setIsPauseScrollSection,
        isMobile
      }}
    >
      {children}
    </ContextCommon.Provider>
  );
};

export const useGetContext = () => {
  const context = useContext(ContextCommon);
  if (!context) {
    throw new Error("Must be used within a Provider");
  }
  return context;
};

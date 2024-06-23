"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface TypeContext {
  isOpenSearch: boolean;
  setIsOpenSearch: (isOpenSearch: boolean) => void;
  isPauseScrollSection: boolean;
  setIsPauseScrollSection: (isPause: boolean) => void;
}

const ContextCommon = createContext<null | TypeContext>(null);

export const ContextCommonProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isPauseScrollSection, setIsPauseScrollSection] =
    useState<boolean>(false);
  return (
    <ContextCommon.Provider
      value={{
        isOpenSearch,
        setIsOpenSearch,
        isPauseScrollSection,
        setIsPauseScrollSection,
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

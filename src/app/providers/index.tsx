"use client";

import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface TypeContext {
  isOpenSearch: boolean;
  setIsOpenSearch: (isOpenSearch: boolean) => void;
  isPauseScrollSection: boolean;
  setIsPauseScrollSection: (isPause: boolean) => void;
  isMobile: boolean;
  isLoading: boolean;
  setIsLoading: (isPause: boolean) => void;
  mainElmRef: MutableRefObject<HTMLElement | null>;
}

const ContextCommon = createContext<null | TypeContext>(null);

export const ContextCommonProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPauseScrollSection, setIsPauseScrollSection] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mainElmRef = useRef(null);
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
        isMobile,
        isLoading,
        setIsLoading,
        mainElmRef,
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

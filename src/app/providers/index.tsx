"use client";

import useBodyOverflowToggle from "@/utils/hooks/useBodyOverflowToggle ";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
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
  sectionIndex: number;
  setSectionIndex: (index: number) => void;
  setIsOverflowHidden : (isHidden : boolean) => void;
  toggleBodyOverflow : () => void;
  isOverflowHidden : boolean;
}

const ContextCommon = createContext<null | TypeContext>(null);

const useMobileCheck = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    }
  }, []);
  return isMobile;
};

export const ContextCommonProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isPauseScrollSection, setIsPauseScrollSection] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const {isOverflowHidden, toggleBodyOverflow, setIsOverflowHidden} = useBodyOverflowToggle(false);
  const isMobile = useMobileCheck();
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
        sectionIndex,
        setSectionIndex,
        toggleBodyOverflow,
        setIsOverflowHidden,
        isOverflowHidden,
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

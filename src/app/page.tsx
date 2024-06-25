"use client";

import useScrollOnePage from "@/utils/hooks/useScrollOnePage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import TopBanner from "./components/homepage/topBanner";
import AboutUs from "./components/homepage/aboutUs";
import Services from "./components/homepage/services";
import Portfolio from "./components/homepage/portfolio";
import VerticalNavBar from "./components/verticalNavBar";
import { useGetContext } from "./providers";
import useHashUrl from "@/utils/hooks/useHashUrl";
import LogoFloat from "./components/logoFloat";
import IconVideoFloat from "./components/IconVideoFloat";
gsap.registerPlugin(useGSAP);

export default function Home() {
  const parentRef = useRef(null);
  const sectionElements = useRef<NodeListOf<Element> | null>(null);
  const { hashName } = useHashUrl();
  const {
    isPauseScrollSection,
    sectionIndex,
    setSectionIndex,
    isMobile,
    isLoading,
    setIsOverflowHidden,
  } = useGetContext();
  useEffect(() => {
    let sections = document.querySelectorAll(".panel");
    sectionElements.current = sections;
  }, []);
  useEffect(() => {
    if (!isLoading && !isMobile) {
      const indexMap: { [key: string]: number } = {
        "#about-us": 1,
        "#services": 2,
        "#portfolio": 3,
      };
      setSectionIndex(indexMap[hashName ?? ""] ?? 0);
      setAnimating(false);
    }
  }, [hashName, isLoading]);

  const handleScrollUp = () => {
    if (!isAnimating && sectionElements.current) {
      setSectionIndex(
        Math.min(sectionIndex + 1, sectionElements.current.length - 1)
      );
    }
  };

  const handleScrollDown = () => {
    if (!isAnimating && sectionElements.current) {
      setSectionIndex(Math.max(sectionIndex - 1, 0));
    }
  };
  const { isAnimating, setAnimating, setIsDisable } = useScrollOnePage({
    onScrollUp: handleScrollUp,
    onScrollDown: handleScrollDown,
    typeScroll: ["wheel", "touch"],
  });

  useEffect(() => {
    if (!isMobile) {
      if (isPauseScrollSection) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    } else {
      setIsDisable(true);
    }
  }, [isPauseScrollSection, isMobile]);

  useGSAP(
    () => {
      if (!isAnimating) {
        const transYIndex = sectionIndex;
        gsap.to(parentRef.current, {
          y: -window.innerHeight * transYIndex,
          duration: 1,
          ease: "expo.inOut",
          delay: 0.1,
          onStart: () => {
            setAnimating(true);
            setIsOverflowHidden(true);
          },
          onComplete: () => {
            setAnimating(false);
            setIsOverflowHidden(false);
          },
        });
      }
    },
    { scope: parentRef, dependencies: [sectionIndex] }
  );
  const _scrollDone = isMobile ? true : !isAnimating;
  return (
    <>
      <main className="lg:overflow-clip w-full lg:h-dvh">
        <LogoFloat />
        <IconVideoFloat />
        <div
          className={`md:w-32 w-10 lg:flex flex-col items-center justify-center bg-black text-white fixed top-0 bottom-0 left-0 md:pb-8 pb-12 hidden`}
        >
          <VerticalNavBar>
            <span className="text-sm">DEVELOPMENT</span>
            <span className="text-sm">DESIGNING</span>
            <span className="text-sm">DIGITAL MARKETING</span>
          </VerticalNavBar>
        </div>
        <div ref={parentRef}>
          <div className="w-full lg:h-dvh panel lg:pt-header pt-16 relative h-[50vh] min-h-[500px]">
            <TopBanner isShow={sectionIndex === 0} scrollDone={_scrollDone} />
          </div>
          <div
            id="about-us"
            className="w-full lg:h-dvh panel pt-header lg:flex lg:justify-center lg:flex-col relative pt-5"
          >
            <AboutUs isShow={sectionIndex === 1} scrollDone={_scrollDone} />
          </div>
          <div
            id="services"
            className=" w-full lg:h-dvh panel pt-header relative"
          >
            <Services isShow={sectionIndex === 2} scrollDone={_scrollDone} />
          </div>
          <div
            id="portfolio"
            className=" w-full lg:h-dvh panel pt-header relative"
          >
            <Portfolio isShow={sectionIndex === 3} scrollDone={_scrollDone} />
          </div>
        </div>
      </main>
    </>
  );
}

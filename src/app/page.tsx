"use client";

import useScrollOnePage from "@/utils/hooks/useScrollOnePage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import TopBanner from "./components/homepage/topBanner";
import AboutUs from "./components/homepage/aboutUs";
import Services from "./components/homepage/services";
import Portfolio from "./components/homepage/portfolio";
import VerticalNavBar from "./components/verticalNavBar";
import Image from "next/image";
import { useGetContext } from "./providers";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const parentRef = useRef(null);
  const sectionElements = useRef<NodeListOf<Element> | null>(null);
  const { isMobile } = useGetContext();
  useEffect(() => {
    let sections = document.querySelectorAll(".panel");
    sectionElements.current = sections;
  }, []);

  const { isPauseScrollSection } = useGetContext();

  const eventScrollUp = () => {
    if (!sectionElements.current) return false;
    if (!isAnimating) {
      const index = Math.min(
        sectionIndex + 1,
        sectionElements.current.length - 1
      );
      setSectionIndex(index);
    }
  };
  const eventScrollDown = () => {
    if (!sectionElements.current) return false;
    if (!isAnimating) {
      const index = Math.max(sectionIndex - 1, 0);
      setSectionIndex(index);
    }
  };
  const { isAnimating, setAnimating, setIsDisable } = useScrollOnePage({
    onScrollUp: eventScrollUp,
    onScrollDown: eventScrollDown,
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
        setAnimating(true);
        const transYIndex = sectionIndex;
        gsap.to(parentRef.current, {
          y: -window.innerHeight * transYIndex,
          duration: 1,
          ease: "expo.inOut",
          delay: 0.1,
          onComplete: () => {
            setAnimating(false);
          },
        });
      }
    },
    { scope: parentRef, dependencies: [sectionIndex] }
  );
  const _scrollDone = isMobile ? true : !isAnimating;
  return (
    <>
      <main className="lg:overflow-hidden w-full lg:h-dvh">
        <BtnFloat1 />
        <BtnFloat2 />
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
          <div className="w-full lg:h-dvh panel pt-header lg:flex lg:justify-center lg:flex-col relative pt-5">
            <AboutUs isShow={sectionIndex === 1} scrollDone={_scrollDone} />
          </div>
          <div className=" w-full lg:h-dvh panel pt-header relative">
            <Services isShow={sectionIndex === 2} scrollDone={_scrollDone} />
          </div>
          <div className=" w-full lg:h-dvh panel pt-header relative">
            <Portfolio isShow={sectionIndex === 3} scrollDone={_scrollDone} />
          </div>
        </div>
      </main>
    </>
  );
}

const BtnFloat1 = () => {
  return (
    <div className="fixed md:top-18 top-24 xl:left-16 left-auto xl:right-auto right-3 md:w-[6.063rem] w-20 aspect-square z-10">
      <Image
        className="w-full h-auto animate-[spin_7s_ease-in-out_infinite]"
        src="/images/block-circle-logo.png"
        width={97}
        height={97}
        alt=""
      />
      <Image
        className="absolute top-0 left-0 bottom-0 right-0 m-auto"
        src="/images/mini-logo.png"
        alt=""
        width={31}
        height={35}
      />
    </div>
  );
};

const BtnFloat2 = () => {
  return (
    <div className="fixed md:bottom-10 bottom-6 md:right-16 right-6 md:w-28 w-20 aspect-square z-10">
      <Image
        className="w-full h-auto animate-[spin_7s_ease-in-out_infinite]"
        src="/images/watch-video.png"
        width={110}
        height={110}
        alt=""
      />
      <Image
        className="absolute top-0 left-0 bottom-0 right-0 m-auto animate-pulse"
        src="/images/ico-play.png"
        alt=""
        width={13}
        height={18}
      />
    </div>
  );
};

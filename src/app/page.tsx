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

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const parentRef = useRef(null);
  const sectionElements = useRef<NodeListOf<Element> | null>(null);
  useEffect(() => {
    let sections = document.querySelectorAll(".panel");
    sectionElements.current = sections;
  }, []);

  const eventScrollUp = () => {
    if (!sectionElements.current) return false;
    if (sectionIndex < sectionElements.current.length - 1 && !isAnimating) {
      setAnimating(true);
      setSectionIndex((prevValue) => prevValue + 1);
    }
  };
  const eventScrollDown = () => {
    if (sectionIndex > 0 && !isAnimating) {
      setAnimating(true);
      setSectionIndex((prevValue) => prevValue - 1);
    }
  };
  const { isAnimating, setAnimating } = useScrollOnePage({
    onScrollUp: eventScrollUp,
    onScrollDown: eventScrollDown,
    typeScroll: ["wheel", "touch"],
  });

  useGSAP(
    () => {
      gsap.to(parentRef.current, {
        y: -window.innerHeight * sectionIndex,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.1,
        onComplete: () => {
          setAnimating(false);
        },
      });
    },
    { scope: parentRef, dependencies: [sectionIndex] }
  );
  return (
    <main className="overflow-hidden w-full h-dvh">
      <div className="fixed top-[138px] left-[99px] w-[97px] aspect-square z-10">
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
      <div className="fixed bottom-[39px] right-[75px] w-[110px] aspect-square z-10">
        <Image
          className="w-full h-auto animate-[spin_7s_ease-in-out_infinite]"
          src="/images/watch-video.png"
          width={110}
          height={110}
          alt=""
        />
        <Image
          className="absolute top-0 left-0 bottom-0 right-0 m-auto"
          src="/images/ico-play.png"
          alt=""
          width={13}
          height={18}
        />
      </div>
      <div
        className={`w-[217px] flex flex-col items-center justify-center bg-black text-white fixed top-0 bottom-0 left-0 pb-8 `}
      >
        <VerticalNavBar>
          <span className="text-sm">DEVELOPMENT</span>
          <span className="text-sm">DESIGNING</span>
          <span className="text-sm">DIGITAL MARKETING</span>
        </VerticalNavBar>
      </div>
      <div ref={parentRef}>
        <div className=" w-full h-dvh panel pt-header relative">
          <TopBanner isShow={sectionIndex === 0} scrollDone={!isAnimating} />
        </div>
        <div className=" w-full h-dvh panel pt-header">
          <AboutUs isShow={sectionIndex === 1} scrollDone={!isAnimating} />
        </div>
        <div className=" w-full h-dvh panel pt-header">
          <Services isShow={sectionIndex === 2} scrollDone={!isAnimating} />
        </div>
        <div className=" w-full h-dvh panel pt-header">
          <Portfolio isShow={sectionIndex === 3} scrollDone={!isAnimating} />
        </div>
      </div>
    </main>
  );
}

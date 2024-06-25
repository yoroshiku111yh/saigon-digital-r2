"use client";

import useBodyOverflowToggle from "@/utils/hooks/useBodyOverflowToggle ";
import { useGetContext } from "../providers";
import GlogoSVG from "./gLogo";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LoadingScreen() {
  const { toggleBodyOverflow } = useBodyOverflowToggle(true);
  const { isLoading, setIsLoading } = useGetContext();
  const backgroundRef = useRef(null);
  const decorRef = useRef(null);
  const loadingScreenRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  useGSAP(
    () => {
      if (!isLoading) {
        gsap.to(backgroundRef.current, {
          bottom: "100%",
          duration: 0.75,
          delay: 0.076,
        });
        gsap.to(decorRef.current, {
          y: -250,
          scale: 0.75,
          opacity: 0,
          duration: 0.5,
        });
        gsap.to(loadingScreenRef.current, {
          zIndex: -1,
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          onComplete: () => {
            toggleBodyOverflow();
          },
        });
      }
    },
    { scope: loadingScreenRef, dependencies: [isLoading] }
  );
  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 z-50"
      ref={loadingScreenRef}
    >
      <div
        className="absolute w-full bg-black top-0 bottom-0 left-0"
        ref={backgroundRef}
      ></div>
      <div className="relative" ref={decorRef}>
        <div className="z-10 w-[280px] relative overflow-hidden">
          <GlogoSVG classPath="animate-[glow-svg-2_2s_ease-in-out_infinite_alternate]" />
        </div>
        <Image
          src="/images/logo.png"
          width={206}
          height={56}
          alt="logo-loading"
          className="absolute xl:w-[13rem] lg:w-44 md:w-32 h-auto -left-[0.2vw] right-0 top-0 bottom-0 m-auto z-20"
        />
      </div>
    </div>
  );
}

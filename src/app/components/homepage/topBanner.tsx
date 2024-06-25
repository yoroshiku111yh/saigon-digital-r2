import Image from "next/image";
import Marquee from "../marquee ";
import React, { useEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GlogoSVG from "../gLogo";
import { getEntryById } from "@/utils/api";
import useSWR from "swr";
import { Sys } from "@/utils/type/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { useGetContext } from "@/app/providers";
gsap.registerPlugin(useGSAP);

interface TypeTopBannerData {
  sys: Sys;
  fields: {
    context: Document;
  };
}

export default function TopBanner(props: {
  isShow: boolean;
  scrollDone: boolean;
}) {
  const { data, isLoading } = useSWR("/hero-banner", () => {
    const entryId = process.env.CONTENTFUL_HERO_BANNER_ENTRY_ID;
    if (!entryId) return null;
    return getEntryById<TypeTopBannerData>({
      id: entryId,
      selectField: ["fields"],
    }).then((entry) => entry);
  });
  const { setIsLoading } = useGetContext();
  const { isShow, scrollDone } = props;
  const containerRef = useRef(null);
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);
  const textDecor = useRef(null);
  const contextRef = useRef(null);
  const marqueeChild1 = Array.from({ length: 7 }, (_, index) => {
    return (
      <React.Fragment key={index}>
        <span className="select-none">Creative design</span>
        <span className="dot w-[17px] h-[17px] "></span>
        <span className="select-none">UI/UX</span>
        <span className="dot w-[17px] h-[17px] "></span>
        <span className="select-none">Marketing</span>
        <span className="dot w-[17px] h-[17px] "></span>
        <span className="select-none">MOtion</span>
        <span className="dot w-[17px] h-[17px] "></span>
        <span className="select-none">Animation</span>
        <span className="dot w-[17px] h-[17px] "></span>
      </React.Fragment>
    );
  });
  const timeline = useMemo(
    () => gsap.timeline({ paused: true, yoyo: true }),
    []
  );
  useEffect(() => {
    timeline
      .fromTo(
        marqueeRef2.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15 },
        "label-1"
      )
      .fromTo(
        marqueeRef1.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15 },
        "label-1"
      )
      .fromTo(
        textDecor.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
        },
        "label-2"
      )
      .fromTo(
        contextRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        "label-2"
      );
  }, []);
  useGSAP(
    () => {
      if (scrollDone && isShow) {
        timeline.play();
      } else if (!isShow) {
        timeline.reverse();
      }
    },
    { scope: containerRef, dependencies: [scrollDone, isShow] }
  );
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="absolute w-full h-full overflow-x-clip overflow-y-visible top-0 left-0">
        <div className="overflow-visible w-3 h-3 flex justify-center items-center absolute lg:bottom-[7vh] bottom-7 right-0 left-0 m-auto z-20">
          <div
            ref={marqueeRef1}
            className="origin-center md:-rotate-[10deg] rotate-0 2xl:h-[6.5rem] xl:h-20 md:h-16 h-12 w-[120vw] bg-gray-21 uppercase text-3xl"
          >
            <Marquee
              gap="2xl:gap-20 xl:gap-14 gap-10"
              animate="animate-[scroll-marquee-1_70s_linear_infinite]"
            >
              {marqueeChild1}
            </Marquee>
          </div>
        </div>
        <div className="overflow-visible w-3 h-3 flex justify-center items-center absolute xl:bottom-0 xl:top-0 xl:right-[3vw] bottom-[15vh] xl:left-auto top-auto right-0 left-0  m-auto z-10">
          <div
            ref={marqueeRef2}
            className="origin-center xl:rotate-[45deg] lg:block hidden rotate-0 uppercase text-3xl w-[130vw] 2xl:h-[6.5rem] xl:h-20 md:h-16 h-12 bg-white text-gray-21"
          >
            <Marquee
              gap="2xl:gap-20 xl:gap-14 gap-10"
              animate="animate-[scroll-marquee-2_80s_linear_infinite]"
            >
              {marqueeChild1}
            </Marquee>
          </div>
        </div>
      </div>
      <div className="container md:pl-[13vw] flex justify-start md:items-start items-center md:pt-[15vh] pt-7 min-w-fit">
        <div className="2xl:text-8xl lg:text-[5vw] md:text-5xl text-4xl lg:w-[80%] w-full relative">
          <div
            ref={contextRef}
            className="relative z-10 select-none leading-normal"
          >
            {data?.fields.context &&
              documentToReactComponents(data.fields.context)}
          </div>
          <div
            ref={textDecor}
            className="absolute md:-left-[10%] left-0 md:right-auto right-0 md:bottom-auto bottom-0 m-auto z-0 2xl:w-[18vw] xl:w-[16vw] md:w-[20vw] w-[40vw] md:block flex justify-center items-center md:top-0 top-16"
          >
            <GlogoSVG classPath="animate-[neon-glow-svg_2s_ease-in-out_infinite_alternate]" />
          </div>
        </div>
      </div>
    </div>
  );
}

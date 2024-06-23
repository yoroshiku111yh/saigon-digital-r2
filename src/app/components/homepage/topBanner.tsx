import Image from "next/image";
import Marquee from "../marquee ";
import React, { useEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function TopBanner(props: {
  isShow: boolean;
  scrollDone: boolean;
}) {
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
    { scope: containerRef, dependencies: [scrollDone] }
  );
  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="absolute w-full h-full overflow-hidden top-0 left-0">
        <div
          ref={marqueeRef1}
          className="lg:block hidden z-20 2xl:-rotate-[13deg] xl:-rotate-6 absolute xl:bottom-[4vh] bottom-8 -left-[10%] right-0 w-[120%] overflow-hidden uppercase text-3xl 2xl:h-[6.5rem] xl:h-20 md:h-16 h-12 bg-gray-21"
        >
          <Marquee
            gap="gap-[85px]"
            animate="animate-[scroll-marquee-1_70s_linear_infinite]"
          >
            {marqueeChild1}
          </Marquee>
        </div>
        <div
          ref={marqueeRef2}
          className="lg:block hidden origin-top z-10 2xl:rotate-[45deg] xl:rotate-[50deg] absolute xl:bottom-[20%] md:bottom-32 bottom-24 xl:left-[33%] left-0 right-0 w-[160%] overflow-hidden uppercase text-3xl 2xl:h-[6.5rem] xl:h-20 md:h-16 h-12 bg-white text-gray-21"
        >
          <Marquee
            gap="2xl:gap-20 xl:gap-14 gap-10"
            animate="animate-[scroll-marquee-2_70s_linear_infinite]"
          >
            {marqueeChild1}
          </Marquee>
        </div>
      </div>
      <div className="container mx-auto 2xl:pl-[13rem] lg:pl-[18vw] md:pl-[12vw] pr-4 z-20 flex justify-start xl:items-center sm:items-start items-center xl:pt-0 md:pt-[15vh] pt-8 w-full h-full min-w-fit">
        <div className="2xl:text-8xl lg:text-[5vw] md:text-5xl sm:text-5xl text-3xl xl:w-[80%] xl:pl-0 pl-[10vw] relative">
          <div ref={contextRef} className="relative z-10 select-none leading-normal">
            Brand .Design .Product.
            <br />
            In-Hous Development.
            <br />
            &More
          </div>
          <div
            ref={textDecor}
            className="absolute xl:top-[2vh] xl:-left-[6rem] z-0 2xl:w-[18vw] xl:w-[16vw] md:w-[20vw] w-36 top-0 left-0 "
          >
            <Image
              className="w-full h-auto"
              src="/images/g.png"
              alt="g"
              width={260}
              height={380}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

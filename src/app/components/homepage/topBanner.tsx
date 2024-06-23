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
          className="z-20 -rotate-[13deg] absolute bottom-28 -left-[10%] right-0 w-[120%] overflow-hidden uppercase text-[32px] h-[104px] bg-gray-21"
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
          className="z-10 rotate-[50deg] absolute bottom-20 left-[43%] right-0 w-[120%] overflow-hidden uppercase text-[32px] h-[104px] bg-white text-gray-21"
        >
          <Marquee
            gap="gap-[85px]"
            animate="animate-[scroll-marquee-1_70s_linear_infinite]"
          >
            {marqueeChild1}
          </Marquee>
        </div>
      </div>
      <div className="container mx-auto pl-[211px] pt-[135px] z-20">
        <div className="text-[90px] leading-relaxed relative">
          <div ref={contextRef} className="relative z-10 select-none">
            Brand.Design.Product.
            <br />
            In-Hous Development.
            <br />
            &More
          </div>
          <div
            ref={textDecor}
            className="absolute top-[44px] -left-[98px] z-0 w-[260px]"
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

import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
gsap.registerPlugin(useGSAP);
function Portfolio(props: TypePropsWrappedComponent) {
  const {
    containerRef,
    headlineRef,
    sideBlockRef,
    sideContext,
    isShow,
    scrollDone,
  } = props;
  const textDecorRef = useRef(null);
  const timeline = useMemo(
    () => gsap.timeline({ paused: true, yoyo: true }),
    []
  );
  useEffect(() => {
    timeline.fromTo(
      textDecorRef.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
      },
      "label-1"
    );
  }, []);
  useGSAP(
    () => {
      if (isShow && scrollDone) {
        timeline.play();
      } else if (!isShow) {
        timeline.reverse();
      }
    },
    { scope: containerRef, dependencies: [scrollDone] }
  );
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          Portfolio
        </h4>
        <span className="opacity-0">Portfolio</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <Image src="/images/p.png" alt="" width={300} height={380} />
        </div>
        <div className="section__context" ref={sideContext}></div>
      </div>
      <Image
        ref={textDecorRef}
        className="absolute bottom-3 left-0 aspect-[1294/156] w-[80.875rem] z-0"
        src="/images/text-large-decor.png"
        alt=""
        width={1294}
        height={156}
      />
    </div>
  );
}

export default withScrollSectionAnimation(Portfolio);

import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import TypeIt from "typeit";

function AboutUs(props: TypePropsWrappedComponent) {
  const {
    containerRef,
    headlineRef,
    sideBlockRef,
    sideContext,
    isShow,
    scrollDone,
  } = props;
  const contextTypingRef = useRef(null);
  useEffect(() => {
    if (isShow && scrollDone && contextTypingRef.current) {
      new TypeIt(contextTypingRef.current, {
        speed: 10,
      }).go();
    }
  }, [isShow, scrollDone]);
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          about us
        </h4>
        <span className="opacity-0">about us</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <Image src="/images/g.png" alt="" width={300} height={380} />
        </div>
        <div className="section__context" ref={sideContext}>
          <div className="flex flex-col w-full gap-6">
            <h5 className="text-[40px] uppercase pb-3">
              we are a digital production team.
            </h5>
            <div className="text-[32px] uppercase tracking-wide leading-relaxed relative">
              <div className="opacity-0">
                Gleamy is a <i>leading</i> design & software development agency
                based in berlin. We help startups & Fortune 500 companies
                delight humans on the other side of the screen.
              </div>
              <div className="absolute top-0 left-0" ref={contextTypingRef}>
                Gleamy is a <i>leading</i> design & software development agency
                based in berlin. We help startups & Fortune 500 companies
                delight humans on the other side of the screen.
              </div>
            </div>
            <div>
              <Link className="capitalize text-2xl" href="/">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withScrollSectionAnimation(AboutUs);

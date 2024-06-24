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
  const titleRef = useRef(null);
  const contextRef = useRef(null);
  const instanceTypeTitle = useRef<null | any>(null);
  const instanceTypeContext = useRef<null | any>(null);
  useEffect(() => {
    if (!instanceTypeTitle.current && titleRef.current) {
      instanceTypeTitle.current = new TypeIt(titleRef.current, {
        speed: 10,
        afterComplete: (instance: any) => instance.destroy(),
      }).go();
    }
    if (!instanceTypeContext.current && contextRef.current) {
      instanceTypeContext.current = new TypeIt(contextRef.current, {
        speed: 12,
        afterComplete: (instance: any) => instance.destroy(),
      }).go();
    }
  }, []);
  useEffect(() => {
    if (isShow && scrollDone) {
      if (instanceTypeTitle.current) {
        instanceTypeTitle.current.reset();
        instanceTypeTitle.current.go();
      }
      if (instanceTypeContext.current) {
        instanceTypeContext.current.reset();
        instanceTypeContext.current.go();
      }
    }
  }, [scrollDone]);
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
          <div className="flex flex-col w-full lg:gap-6 gap-3">
            <div className="lg:text-[2.5rem] text-3xl uppercase pb-3 relative">
              <h5 className="opacity-0">we are a digital production team.</h5>
              <h5 className="absolute top-0 left-0" ref={titleRef}>
                we are a digital production team.
              </h5>
            </div>
            <div className="lg:text-[2rem] text-2xl uppercase tracking-wide leading-relaxed relative">
              <div className="opacity-0">
                Gleamy is a <i>leading</i> design & software development agency
                based in berlin. We help startups & Fortune 500 companies
                delight humans on the other side of the screen.
              </div>
              <div className="absolute top-0 left-0" ref={contextRef}>
                Gleamy is a <i>leading</i> design & software development agency
                based in berlin. We help startups & Fortune 500 companies
                delight humans on the other side of the screen.
                <Image
                  className="inline translate-x-[11px] -translate-y-[8px] aspect-[45/35] lg:w-auto w-7"
                  src="/images/ico-1.png"
                  alt=""
                  width={45}
                  height={35}
                />
              </div>
            </div>
            <div>
              <Link className="btn-common" href="/">
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

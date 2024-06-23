import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Flickity from "react-flickity-component";

const flickityOptions = {
  cellAlign: "left",
  autoPlay: true,
  prevNextButtons: false,
  pageDots: false,
  groupCells: true,
  wrapAround: true
};

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
    <div className="container mx-auto mr-0 container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          Portfolio
        </h4>
        <span className="opacity-0">Portfolio</span>
      </div>
      <div className="section__container z-20">
        <div className="section__side" ref={sideBlockRef}>
          <Image src="/images/p.png" alt="" width={300} height={380} />
        </div>
        <div className="section__context overflow-y-visible overflow-x-clip" ref={sideContext}>
          <Flickity options={flickityOptions}>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-image-item mr-12">
                <div className="card-image-item__headline">
                  <h5>Phomi</h5>
                </div>
                <div className="card-image-item__thumbnail">
                  <Image
                    src="/images/thumb-1.png"
                    alt="thumb-1"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="card-image-item__contain">
                  <h5 className="card-image-item__title">Gleamy portfolio</h5>
                  <div className="flex flex-row gap-3 justify-center items-center text-base font-light">
                    <span className="dot"></span>
                    <Link href="/">UI/UX</Link>
                  </div>
                </div>
              </div>
            </div>
          </Flickity>
        </div>
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

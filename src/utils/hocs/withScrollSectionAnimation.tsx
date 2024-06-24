import { useGetContext } from "@/app/providers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ComponentType,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";

let baffle = require("baffle");

gsap.registerPlugin(useGSAP);

export interface TypePropsScroll {
  scrollDone: boolean;
  isShow: boolean;
}

export interface TypePropsWrappedComponent extends TypePropsScroll {
  containerRef: MutableRefObject<null>;
  headlineRef: MutableRefObject<null>;
  sideBlockRef: MutableRefObject<null>;
  sideContext: MutableRefObject<null>;
}

function withScrollSectionAnimation(
  WrappedComponent: ComponentType<TypePropsWrappedComponent>
) {
  return (props: TypePropsScroll) => {
    const { scrollDone, isShow } = props;
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const sideBlockRef = useRef(null);
    const sideContext = useRef(null);
    const timeline = useMemo(
      () => gsap.timeline({ paused: true, yoyo: true }),
      []
    );
    const { isMobile } = useGetContext();
    useEffect(() => {
      timeline
        .fromTo(
          headlineRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.15,
            onStart: () => {
              let text = baffle(headlineRef.current);
              text.set({
                characters: "!/|~#.^+*$#%nwf",
                speed: 100,
              });
              text.start();
              text.reveal(700);
            },
          },
          "label-1"
        )
        .fromTo(
          sideBlockRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          "label-2"
        )
        .fromTo(
          sideContext.current,
          {
            opacity: 0,
            y: -20,
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
        if (!isMobile) {
          if (scrollDone && isShow) {
            timeline.play();
          } else if (!isShow) {
            timeline.reverse();
          }
        } else {
          timeline.play();
        }
      },
      { scope: containerRef, dependencies: [scrollDone, isMobile] }
    );
    return (
      <WrappedComponent
        {...props}
        containerRef={containerRef}
        headlineRef={headlineRef}
        sideBlockRef={sideBlockRef}
        sideContext={sideContext}
      />
    );
  };
}

export default withScrollSectionAnimation;

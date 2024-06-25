import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Flickity from "react-flickity-component";
import PlogoSVG from "../pLogo";
import { Metadata } from "next";
import { ContentfulAsset, Sys } from "@/utils/type/contentful";
import { getEntryById } from "@/utils/api";
import useSWR from "swr";

const flickityOptions = {
  cellAlign: "left",
  autoPlay: true,
  prevNextButtons: false,
  pageDots: false,
  groupCells: true,
  wrapAround: true,
  reloadOnUpdate : true
};

////////////////////////

interface ReferenceBlockFields {
  headline: string;
  title: string;
  url: string;
  categories: { text: string }[];
  thumbnail: ContentfulAsset;
}

interface ReferenceBlock {
  metadata: Metadata;
  sys: Sys;
  fields: ReferenceBlockFields;
}

interface TypePortfolioData {
  fields: {
    headline: string;
    referenceBlocks: ReferenceBlock[];
  };
  sys: Sys;
}

///////////////////////

gsap.registerPlugin(useGSAP);
function Portfolio(props: TypePropsWrappedComponent) {
  const { data, error, isLoading } = useSWR("/section-portfolio", () => {
    const entryId = process.env.CONTENTFUL_PORTFOLIO_ENTRY_ID;
    if (!entryId) return null;
    return getEntryById<TypePortfolioData>({
      id: entryId,
      selectField: ["fields"],
    }).then((entry) => entry);
  });
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
    if (textDecorRef.current) {
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
    }
  }, [textDecorRef.current]);
  useGSAP(
    () => {
      if (isShow && scrollDone) {
        timeline.play();
      } else if (!isShow) {
        timeline.reverse();
      }
    },
    { scope: containerRef, dependencies: [scrollDone, isShow] }
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + JSON.stringify(error);
  return (
    <div
      className="container mx-auto mr-0 pr-0 container-section pb-7"
      ref={containerRef}
    >
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          {data && data.fields.headline}
        </h4>
        <span className="opacity-0">{data && data.fields.headline}</span>
      </div>
      <div className="section__container z-20">
        <div className="section__side" ref={sideBlockRef}>
          <PlogoSVG classPath="animate-[glow-svg-1_2s_ease-in-out_infinite_alternate]" />
        </div>
        <div
          className="section__context overflow-y-visible overflow-x-clip w-full"
          ref={sideContext}
        >
          {data && (
            <Flickity options={flickityOptions}>
              {data.fields.referenceBlocks.map((item, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={item.fields.url}
                      className="card-image-item mr-12"
                    >
                      <div className="card-image-item__headline">
                        <h5>{item.fields.headline}</h5>
                      </div>
                      <div className="card-image-item__thumbnail">
                        <Image
                          src={"https:" + item.fields.thumbnail.fields.file.url}
                          alt={item.fields.thumbnail.fields.file.fileName}
                          width={
                            item.fields.thumbnail.fields.file.details.image
                              ?.width
                          }
                          height={
                            item.fields.thumbnail.fields.file.details.image
                              ?.height
                          }
                        />
                      </div>
                      <div className="card-image-item__contain">
                        <h5 className="card-image-item__title">
                          {item.fields.title}
                        </h5>
                        <div className="inline-flex flex-wrap gap-2">
                          {item.fields.categories.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-row gap-3 justify-center items-center text-base font-light"
                              >
                                <span className="dot"></span>
                                <span>{item.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Flickity>
          )}
        </div>
      </div>
      <Image
        ref={textDecorRef}
        className="absolute bottom-3 left-0 aspect-[1294/156] w-[80.875rem] z-0 max-w-full lg:block hidden"
        src="/images/text-large-decor.png"
        alt=""
        width={1294}
        height={156}
      />
    </div>
  );
}

export default withScrollSectionAnimation(Portfolio);

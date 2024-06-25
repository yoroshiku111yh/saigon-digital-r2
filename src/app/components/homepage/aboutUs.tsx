import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import TypeIt from "typeit";
import GlogoSVG from "../gLogo";
import useSWR from "swr";
import { getEntryById } from "@/utils/api";
import { Sys } from "@/utils/type/contentful";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface TypeAboutUsData {
  sys: Sys;
  fields: {
    description: Document;
    headline: string;
    title: string;
    linkButton: { text: string; url: string };
  };
}

function AboutUs(props: TypePropsWrappedComponent) {
  const { data, isLoading, error } = useSWR("/section-about-us", () => {
    const entryId = process.env.CONTENTFUL_ABOUT_US_ENTRY_ID;
    if (!entryId) return null;
    return getEntryById<TypeAboutUsData>({
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
  }, [titleRef.current, contextRef.current]);
  useEffect(() => {
    if (instanceTypeTitle.current && instanceTypeContext.current) {
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
    }
  }, [scrollDone, instanceTypeTitle.current, instanceTypeContext.current]);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + JSON.stringify(error);
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          {data && data.fields.title}
        </h4>
        <span className="opacity-0">{data && data.fields.title}</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <GlogoSVG classPath="animate-[glow-svg-3_2s_ease-in-out_infinite_alternate]" />
        </div>
        <div className="section__context" ref={sideContext}>
          <div className="flex flex-col w-full lg:gap-6 gap-3">
            <div className="lg:text-[2.5rem] text-3xl uppercase pb-3 relative">
              <h5 className="opacity-0">{data && data.fields.headline}</h5>
              <h5 className="absolute top-0 left-0" ref={titleRef}>
                {data && data.fields.headline}
              </h5>
            </div>
            <div className="lg:text-[2rem] text-2xl uppercase tracking-wide leading-relaxed relative">
              <div className="opacity-0 ">
                {data && documentToReactComponents(data.fields.description)}
              </div>
              <div
                className="absolute top-0 left-0 [&>*]:inline"
                ref={contextRef}
              >
                {data && documentToReactComponents(data.fields.description)}
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
              {data && (
                <Link className="btn-common" href={data.fields.linkButton.url}>
                  {data.fields.linkButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withScrollSectionAnimation(AboutUs);

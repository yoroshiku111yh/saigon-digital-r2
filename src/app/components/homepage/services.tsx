"use client";

import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, use, useEffect, useMemo, useRef, useState } from "react";
import SlogoSVG from "../sLogo";
import { getEntryById } from "@/utils/api";
import { Metadata, Sys } from "@/utils/type/contentful";
import Markdown from "react-markdown";
import useSWR from "swr";
gsap.registerPlugin(useGSAP);

interface ReferenceBlockFields {
  description: string;
  linkButton: {
    text: string;
    url: string;
  };
  title: string;
}

interface ReferenceBlock {
  metadata: Metadata;
  sys: Sys;
  fields: ReferenceBlockFields;
}

interface TypeServiceData {
  fields: {
    headline: string;
    referenceBlocks: ReferenceBlock[];
  };
  sys: Sys;
}

function Services(props: TypePropsWrappedComponent) {
  const { data, error, isLoading } = useSWR("section-services", () => {
    const entryId = process.env.CONTENTFUL_SERVICES_ENTRY_ID;
    if (!entryId) {
      console.error("MISSING .ENV");
      return null;
    }
    return getEntryById<TypeServiceData>({
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
    { scope: containerRef, dependencies: [scrollDone, isShow] }
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + JSON.stringify(error);
  let listBlockText: ReactElement[] = [];
  if (data) {
    const { fields } = data;
    const { referenceBlocks } = fields;
    listBlockText = referenceBlocks.map((item, index) => {
      return (
        <div className="card-text" key={index}>
          <h6 className="card-text__title">{item.fields.title}</h6>
          <div className="card-text__context">
            <Markdown>{item.fields.description}</Markdown>
          </div>
          <div className="pt-4">
            <Link href={item.fields.linkButton.url} className="btn-common">
              {item.fields.linkButton.text}
            </Link>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          {data?.fields.headline}
        </h4>
        <span className="opacity-0">{data?.fields.headline}</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <SlogoSVG classPath="animate-[glow-svg-2_2s_ease-in-out_infinite_alternate]" />
        </div>
        <div className="section__context" ref={sideContext}>
          <div className="flex lg:flex-row flex-col flex-wrap [&>*]:flex-1 [&>*]:min-w-52 md:[&>*]:max-w-[400px] gap-8">
            {listBlockText}
          </div>
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

export default withScrollSectionAnimation(Services);

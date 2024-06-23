"use client";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
gsap.registerPlugin(useGSAP);

export default function ContentMenu(props: {
  isOpen: boolean | null;
  onClick: () => void;
}) {
  const { isOpen, onClick } = props;
  const container = useRef(null);
  const waveDecor = useRef(null);
  const containMenu = useRef(null);
  useGSAP(
    () => {
      if (isOpen) {
        gsap.fromTo(
          waveDecor.current,
          { width: "150%" },
          {
            duration: 1.25,
            width: "0%",
            ease: "expo.inOut",
          }
        );
        gsap.fromTo(
          container.current,
          { width: "0%" },
          {
            duration: 0.75,
            width: "100%",
            ease: "expo.inOut",
          }
        );
        gsap.fromTo(
          containMenu.current,
          { y: "25px", opacity: 0 },
          {
            delay: 0.75,
            duration: 0.35,
            y: "0px",
            opacity: 1,
            ease: "sine.inOut",
          }
        );
      } else if (isOpen === false) {
        gsap.fromTo(
          containMenu.current,
          { y: "0", opacity: 1 },
          {
            duration: 0.35,
            y: "25px",
            opacity: 0,
            ease: "sine.inOut",
          }
        );
        gsap.fromTo(
          waveDecor.current,
          { width: "0%" },
          {
            delay: 0.35,
            duration: 0.75,
            width: "150%",
            ease: "expo.inOut",
          }
        );
        gsap.fromTo(
          container.current,
          { width: "100%" },
          {
            delay: 0.35,
            duration: 1.25,
            width: "0%",
            ease: "expo.inOut",
          }
        );
      }
    },
    { dependencies: [isOpen], scope: container }
  );
  return (
    <div
      ref={container}
      className="w-0 h-dvh fixed z-30 top-0 left-0 right-0 bottom-0 bg-white overflow-hidden"
    >
      <div ref={waveDecor} className="wave-decor-menu z-20"></div>
      <div className="w-screen absolute top-0 left-0 right-0 z-20">
        <div className="flex justify-end items-center container mx-auto relative h-header">
          <div className="cursor-pointer" onClick={onClick}>
            <svg
              width="29"
              height="13"
              viewBox="0 0 29 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.875 2H28.875" stroke="black" strokeWidth="3" />
              <path d="M0.875 11H19.375" stroke="black" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 h-full">
        <SideDecor />
        <div
          className="flex flex-wrap gap-10 pt-header px-6 [&>*]:min-w-fit [&>*]:flex-1"
          ref={containMenu}
        >
          <div className="flex flex-col gap-4 flex-auto">
            <h4 className="text-xl text-black capitalize font-light text-gray-400">
              Menu
            </h4>
            <ul className="menu-header-list text-5xl font-semibold">
              <li>
                <Link href="/">About us</Link>
              </li>
              <li>
                <Link href="/">Services</Link>
              </li>
              <li>
                <Link href="/">Portfolio</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 flex-auto">
            <h4 className="text-xl text-black capitalize font-light text-gray-400">
              Social
            </h4>
            <ul className="menu-header-list">
              <li>
                <Link href="/">instagram</Link>
              </li>
              <li>
                <Link href="/">Facebook</Link>
              </li>
              <li>
                <Link href="/">twitter</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 flex-auto flex-[2]">
            <h4 className="text-xl text-black capitalize font-light text-gray-400">
              Contact
            </h4>
            <ul className="menu-header-list">
              <li>
                <Link href="/">
                  <strong>Phone:</strong> (555) 123-4567
                </Link>
              </li>
              <li>
                <Link href="/">
                  <strong>Email:</strong> john.doe@example.com
                </Link>
              </li>
              <li>
                <Link href="/">
                  <strong>Address:</strong> 123 Main St, Springfield, IL 62701
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideDecor() {
  return (
    <div className="bg-black flex justify-center items-center relative">
      <Image
        className="aspect-[307/469] max-w-[70%] z-10"
        src="/images/g-logo.png"
        alt="g-logo"
        width={307}
        height={469}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 m-auto blur-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 288 288"
          className="max-w-[80%] max-h-[80%] m-auto absolute top-0 left-0 right-0 bottom-0"
        >
          <linearGradient
            id="PSgrad_0"
            x1="70.711%"
            x2="0%"
            y1="70.711%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgb(95,54,152)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(247,109,138)" stopOpacity="1" />
          </linearGradient>
          <path fill="url(#PSgrad_0)">
            <animate
              repeatCount="indefinite"
              attributeName="d"
              dur="10s"
              values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z; M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 C48.9,198.6,57.8,191,51,171.3z; M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z	"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

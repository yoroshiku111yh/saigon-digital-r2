"use client";

import Link from "next/link";
import "../../assets/css/header.css";
import Image from "next/image";
import { useState } from "react";
import ContentMenu from "./components/contain-menu";
import { useGetContext } from "../providers";

export default function Header() {
  const [isOpenMenu, setOpenMenu] = useState<boolean | null>(null);
  const onClickMenu = () => {
    toggleBodyOverflow();
    setOpenMenu(!isOpenMenu);
  };
  const { setIsOpenSearch, toggleBodyOverflow } = useGetContext();
  return (
    <>
      <header className="h-header fixed w-full left-0 right-0 z-30">
        <div className="nav container mx-auto">
          <div className="flex-row md:flex hidden gap-4 text-sm text-white uppercase justify-start items-center">
            <Link href="/">FB</Link>
            <span className="dot"></span>
            <Link href="/">IN</Link>
            <span className="dot"></span>
            <Link href="/">DR</Link>
            <span className="dot"></span>
            <Link href="/">BE</Link>
          </div>
          <Link href="/" className="xl:w-[13rem] lg:w-44 md:w-32 w-28 block">
            <Image
              className="w-full h-auto"
              src="/images/logo.png"
              alt="logo"
              width={206}
              height={56}
            />
          </Link>
          <div className="flex lg:gap-10 gap-4 justify-end items-center">
            <svg
              onClick={() => setIsOpenSearch(true)}
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] aspect-square cursor-pointer"
            >
              <path
                d="M8.125 0.5C12.1291 0.5 15.375 3.74594 15.375 7.75C15.375 9.4819 14.7677 11.0719 13.7545 12.3188L18.6553 17.2197C18.9482 17.5126 18.9482 17.9874 18.6553 18.2803C18.3891 18.5466 17.9724 18.5708 17.6788 18.3529L17.5947 18.2803L12.6938 13.3795C11.4469 14.3927 9.8569 15 8.125 15C4.12094 15 0.875 11.7541 0.875 7.75C0.875 3.74594 4.12094 0.5 8.125 0.5ZM8.125 2C4.94936 2 2.375 4.57436 2.375 7.75C2.375 10.9256 4.94936 13.5 8.125 13.5C11.3006 13.5 13.875 10.9256 13.875 7.75C13.875 4.57436 11.3006 2 8.125 2Z"
                fill="white"
              />
            </svg>
            <span className="h-8 w-px bg-gradient-to-t from-transparent via-white to-transparent"></span>
            <div>
              <div
                className="cursor-pointer flex gap-4 items-center uppercase text-sm"
                onClick={onClickMenu}
              >
                <span>MENU</span>
                <div className={`cursor-pointer hamburger ${isOpenMenu && "-open"}`}>
                  <svg
                    stroke="#fff"
                    width="48px"
                    height="48px"
                    viewBox="0 0 48 48"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <line x1="0" y1="17" x2="48" y2="17" strokeWidth="4" />
                      <line x1="0" y1="31" x2="32" y2="31" strokeWidth="4" />
                    </g>

                    <g>
                      <line x1="0" y1="24" x2="48" y2="24" strokeWidth="4" />
                      <line x1="0" y1="24" x2="48" y2="24" strokeWidth="4" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ContentMenu isOpen={isOpenMenu} onClick={onClickMenu} />
    </>
  );
}

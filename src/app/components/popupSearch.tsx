"use client"

import { useEffect, useRef } from "react";
import { useGetContext } from "../providers";
import { useOnClickOutside } from "usehooks-ts";

export default function PopupSearch() {
  const { isOpenSearch, setIsOpenSearch, setIsPauseScrollSection, setIsOverflowHidden } =
    useGetContext();
  const wrapperRef = useRef(null);
  const handleClickOutside = () => {
    setIsOpenSearch(false);
  };
  useOnClickOutside(wrapperRef, handleClickOutside);
  useEffect(() => {
    if (isOpenSearch) {
      setIsOverflowHidden(true);
      setIsPauseScrollSection(true);
    } else {
      setIsOverflowHidden(false);
      setIsPauseScrollSection(false);
    }
  }, [isOpenSearch]);
  return (
    <>
      {isOpenSearch && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-50 w-full h-full bg-black/35 flex justify-center items-start overflow-hidden px-4">
          <div
            className="w-[47.375rem] max-w-full mx-auto relative bg-slate-900 rounded-xl py-5 lg:max-h-96 max-h-72 flex flex-col md:mt-20 mt-10"
            ref={wrapperRef}
          >
            <div className="flex flex-row justify-between items-center gap-3 pb-5 px-4 ">
              <svg
                onClick={() => setIsOpenSearch(true)}
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
              >
                <path
                  d="M8.125 0.5C12.1291 0.5 15.375 3.74594 15.375 7.75C15.375 9.4819 14.7677 11.0719 13.7545 12.3188L18.6553 17.2197C18.9482 17.5126 18.9482 17.9874 18.6553 18.2803C18.3891 18.5466 17.9724 18.5708 17.6788 18.3529L17.5947 18.2803L12.6938 13.3795C11.4469 14.3927 9.8569 15 8.125 15C4.12094 15 0.875 11.7541 0.875 7.75C0.875 3.74594 4.12094 0.5 8.125 0.5ZM8.125 2C4.94936 2 2.375 4.57436 2.375 7.75C2.375 10.9256 4.94936 13.5 8.125 13.5C11.3006 13.5 13.875 10.9256 13.875 7.75C13.875 4.57436 11.3006 2 8.125 2Z"
                  fill="white"
                />
              </svg>
              <input
                className="text-base bg-transparent flex-1 border-none focus:outline-none"
                placeholder="Search..."
              />
              <svg
                onClick={() => setIsOpenSearch(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="size-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <hr className="border-gray-400/30" />
            <div className="overflow-auto flex-1">
              <h5 className="text-lg px-4 py-5">Result :</h5>
              <div className="flex flex-col gap-0">
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
                <div className="text-sm text-gray-400  hover:bg-white/5 transition-colors cursor-pointer p-4">
                  Get started with Tailwind CSS
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { ReactNode } from "react";

export default function VerticalNavBar(props: {
  children: ReactNode;
  classStyle?: string;
}) {
  return (
    <div
      className={`flex flex-row items-center justify-start flex-nowrap space-x-11 -rotate-90 [&>*]:text-nowrap uppercase ${props.classStyle}`}
    >
      {props.children}
    </div>
  );
}

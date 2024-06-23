import { ReactNode } from "react";

export default function Marquee(props: {
  children: ReactNode;
  animate: string;
  gap: string;
}) {
  const { children, animate, gap } = props;
  return (
    <div
      className={`flex items-center flex-nowrap flex-shrink-0 bottom-0 left-0 right-0 min-w-full h-full ${gap}`}
    >
      <div className={`marquee__content ${animate} ${gap}`}>{children}</div>
      <div className={`marquee__content ${animate} ${gap}`}>{children}</div>
    </div>
  );
}

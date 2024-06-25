import Image from "next/image";

const LogoFloat = () => {
  return (
    <div className="fixed md:top-18 top-24 xl:left-16 left-auto xl:right-auto right-3 md:w-[6.063rem] w-20 aspect-square z-10">
      <Image
        className="w-full h-auto animate-[spin_7s_ease-in-out_infinite]"
        src="/images/block-circle-logo.png"
        width={97}
        height={97}
        alt=""
      />
      <Image
        className="absolute top-0 left-0 bottom-0 right-0 m-auto"
        src="/images/mini-logo.png"
        alt=""
        width={31}
        height={35}
      />
    </div>
  );
};

export default LogoFloat;

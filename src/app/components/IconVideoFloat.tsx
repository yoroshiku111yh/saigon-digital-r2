import Image from "next/image";

const IconVideoFloat = () => {
  return (
    <div className="fixed md:bottom-10 bottom-6 md:right-16 right-6 md:w-28 w-20 aspect-square z-10">
      <Image
        className="w-full h-auto animate-[spin_7s_ease-in-out_infinite]"
        src="/images/watch-video.png"
        width={110}
        height={110}
        alt=""
      />
      <Image
        className="absolute top-0 left-0 bottom-0 right-0 m-auto animate-pulse"
        src="/images/ico-play.png"
        alt=""
        width={13}
        height={18}
      />
    </div>
  );
};

export default IconVideoFloat;

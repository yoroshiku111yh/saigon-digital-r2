import { useEffect, useState } from "react";
import { Observer } from "gsap/Observer";
import gsap from "gsap";

gsap.registerPlugin(Observer);

type TypeScroll = "wheel" | "touch" | "pointer";

interface TypeProps {
    onScrollUp: () => void;
    onScrollDown: () => void;
    wheelSpeed?: number,
    isOnMobile?: false
    typeScroll : TypeScroll[];
}


export default function useScrollOnePage(props: TypeProps) {
    const { onScrollDown, onScrollUp, wheelSpeed, typeScroll } = props;
    const [isAnimating, setAnimating] = useState<boolean>(false);
    useEffect(() => {
        let obser = Observer.create({
            type: typeScroll.toString(),
            wheelSpeed: wheelSpeed || -1,
            onDown: () => {
                onScrollDown();
            },
            onUp: () => {
                onScrollUp();
            },
            tolerance: 10,
            preventDefault: true,
        });
        return () => {
            if (obser)
                obser.kill();
        };
    }, [isAnimating]);
    return {
        isAnimating,
        setAnimating
    }
}
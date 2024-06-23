import { useEffect, useState } from "react";

const useBodyOverflowToggle = (isOpen: boolean) => {
    const [isOverflowHidden, setIsOverflowHidden] = useState<Boolean>(isOpen);
    useEffect(() => {
        if (isOverflowHidden) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOverflowHidden]);

    const toggleBodyOverflow = () => {
        setIsOverflowHidden(prevState => !prevState);
    };

    return { isOverflowHidden, toggleBodyOverflow };
};

export default useBodyOverflowToggle;
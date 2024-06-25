import { useEffect, useState } from "react";


export default function useHashUrl() {
    const [hashName, setHashName] = useState<string>();
    useEffect(() => {
        setHashName(window.location.hash);
        const handleHashChange = () => {
            setHashName(window.location.hash);
        };
        window.addEventListener("hashchange", handleHashChange, false);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [])
    return {
        hashName,
        setHashName
    }
}
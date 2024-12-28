"use client";
import { useEffect, useState } from "react";

const useScrollEnd = (offset: number, onEndReached?: () => void): boolean => {
  const [endReached, setEndReached] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.floor(document.documentElement.offsetHeight) <=
        window.scrollY + window.innerHeight + offset
      ) {
        if (!endReached) {
          setEndReached(true);
          onEndReached?.();
        }
      } else {
        if (endReached) setEndReached(false);
      }
    };

    let initialCall = true;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (initialCall) {
        initialCall = false;
        return;
      }

      const resizedElement = entries[0];
      if (
        Math.floor(resizedElement.contentRect.height) >
        window.scrollY + window.innerHeight + offset
      ) {
        if (endReached) setEndReached(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(document.documentElement);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [endReached]);

  return endReached;
};

export default useScrollEnd;

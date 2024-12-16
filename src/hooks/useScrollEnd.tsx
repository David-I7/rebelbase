"use client";
import { useEffect, useState } from "react";

const useScrollEnd = (offset: number) => {
  const [endReached, setEndReached] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(
        document.documentElement.offsetHeight,
        window.scrollY + window.innerHeight + offset
      );
      if (
        Math.floor(document.documentElement.offsetHeight) <=
        window.scrollY + window.innerHeight + offset
      ) {
        setEndReached(true);
      } else {
        setEndReached(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const resizedElement = entries[0];

      if (
        Math.floor(resizedElement.contentRect.height) >
        window.scrollY + window.innerHeight + offset
      ) {
        setEndReached(false);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return endReached;
};

export default useScrollEnd;

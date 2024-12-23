import { useEffect, useState } from "react";

export default function useWindowSizeRange(
  start: number,
  end: number
): boolean {
  const [inRange, setInRange] = useState<boolean>(() => {
    return window.innerWidth >= start && window.innerWidth < end;
  });

  const handleResize = () => {
    if (window.innerWidth >= start && window.innerWidth < end) {
      if (!inRange) setInRange(true);
    } else {
      if (inRange) setInRange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [inRange]);

  return inRange;
}
export function useWindowSizeRangeSSRTrue(
  start: number,
  end: number,
  initialValue: boolean
): boolean {
  const [inRange, setInRange] = useState<boolean>(initialValue);

  const handleResize = () => {
    if (window.innerWidth >= start && window.innerWidth < end) {
      if (!inRange) setInRange(true);
    } else {
      if (inRange) setInRange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [inRange]);

  return inRange;
}

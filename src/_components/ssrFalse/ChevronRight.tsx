"use client";
import useWindowSizeRange from "@/hooks/useWindowSizeRange";
import { MdChevronRight } from "react-icons/md";

const ChevronRight = ({ start, end }: { start: number; end: number }) => {
  const inRange = useWindowSizeRange(start, end);

  if (!inRange) return;

  return <MdChevronRight className="flex-shrink-0" size={32} />;
};

export default ChevronRight;

"use client";
import dynamic from "next/dynamic";

const ChevronRight = dynamic(
  () => import("@/_components/ssrFalse/ChevronRight"),
  { ssr: false }
);

const ChevronRightDynamic = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  return <ChevronRight start={start} end={end} />;
};

export default ChevronRight;

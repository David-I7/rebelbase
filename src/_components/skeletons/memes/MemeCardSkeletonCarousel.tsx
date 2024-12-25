import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import React from "react";
import MemeCardSkeleton from "./MemeCardSkeleton";

const itemCount = 10;

const MemeCardSkeletonCarousel = () => {
  const memeSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    memeSkeletons.push(<MemeCardSkeleton key={`meme_skeleton_${i}`} />);
  }

  return (
    <FixedSizeCarousel>
      <ul className="inline-flex gap-4">{memeSkeletons}</ul>
    </FixedSizeCarousel>
  );
};

export default MemeCardSkeletonCarousel;

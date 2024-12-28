import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import React from "react";
import MemeCardSkeleton from "./MemeCardSkeleton";
import { MdChevronRight } from "react-icons/md";

const itemCount = 10;

const MemesSkeleton = () => {
  const memeSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    memeSkeletons.push(<MemeCardSkeleton key={`meme_skeleton_${i}`} />);
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
          Memes
        </h2>
        <MdChevronRight size={32} className="text-on-surface-heading" />
      </div>
      <FixedSizeCarousel>
        <ul className="animate-pulse inline-flex gap-4 pr-4 md:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {memeSkeletons}
        </ul>
      </FixedSizeCarousel>
    </div>
  );
};

export default MemesSkeleton;

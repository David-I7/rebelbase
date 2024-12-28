import React from "react";
import VerticalCardSkeleton from "./cards/VerticalCardSkeleton";
import CardDetailsSkeleton from "./cards/CardDetailsSkeleton";

const FilterGameGridSkeleton = ({
  skeletonCount = 40,
  type = "RATING",
}: {
  skeletonCount?: number;
  type?: "RATING" | "FIRST_RELEASE_DATE";
}) => {
  const skeletons: React.JSX.Element[] = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <VerticalCardSkeleton key={`filter_game_grid_skeleton_${i}`}>
        <CardDetailsSkeleton type={type} />
      </VerticalCardSkeleton>
    );
  }

  return (
    <div className="animate-pulse filter-game-grid [@media(max-width:622px)]:grid-cols-2 [@media(min-width:622px)]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6">
      {skeletons}
    </div>
  );
};

export default FilterGameGridSkeleton;

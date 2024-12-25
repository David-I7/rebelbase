import VerticalListSkeleton from "@/_components/skeletons/list/VerticalListItemSkeleton";
import VerticalListSection from "./_components/gameRepresentation/list/VerticalListSection";
import VerticalRay from "@/_components/VerticalRay";

export default function LoadingHome() {
  return (
    <main>
      <div className="max-w-[1280px] mx-auto mt-8">
        {/* <HeroSection gameData={gameData?.topNewReleases.result} /> */}
      </div>
      <div className="flex flex-col [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        {/* <MostAnticipated gameData={gameData?.mostAnticipated.result} />
        <TopRated gameData={gameData?.topRated.result} /> */}
      </div>
      <div className="max-w-[1280px] [@media(min-width:1344px)]:mx-auto ml-4 md:ml-8">
        <VerticalListSection>
          <VerticalListSkeleton sectionName="Offline Games" />
          <VerticalRay />
          <VerticalListSkeleton sectionName="Online Games" />
          <VerticalRay />
          <VerticalListSkeleton sectionName="Casual Games" />
        </VerticalListSection>
      </div>
      <div className="[@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        {/* <UpcomingReleases gameData={gameData?.upcomingReleases.result} /> */}
      </div>
    </main>
  );
}

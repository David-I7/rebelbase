import VerticalListSkeleton from "@/_components/skeletons/list/VerticalListItemSkeleton";
import VerticalListSection from "@/app/_components/gameRepresentation/list/VerticalListSection";
import VerticalRay from "@/_components/VerticalRay";
import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import { MdChevronRight } from "react-icons/md";
import VerticalCardSkeleton from "@/_components/skeletons/cards/VerticalCardSkeleton";
import CardDetailsSkeleton from "@/_components/skeletons/cards/CardDetailsSkeleton";
import HorizontalCardSkeleton from "@/_components/skeletons/cards/HorizontalCard";
import HeroSectionSkeleton from "@/_components/skeletons/heroSection/HeroSectionSkeleton";

function createListFromComponent(
  Component: () => React.JSX.Element,
  itemCount: number,
  key: string
): React.JSX.Element[] {
  const components: ReturnType<typeof createListFromComponent> = [];

  for (let i = 0; i < itemCount; i++) {
    components.push(<Component key={`${key}_${i}`} />);
  }

  return components;
}

export default function LoadingHome() {
  return (
    <main>
      <div className="max-w-[1280px] mx-auto mt-8">
        <HeroSectionSkeleton />
      </div>
      <div className="flex flex-col [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <FixedSizeCarousel>
          <div className="flex items-center mb-4 mt-20">
            <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
              Most Anticipated
            </h2>
            <MdChevronRight size={32} className="text-on-surface-heading" />
          </div>
          <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,200px)] md:grid-cols-[repeat(15,254px)] lg:grid-cols-[repeat(15,308px)] gap-4 pr-4 lg:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
            {createListFromComponent(
              () => (
                <HorizontalCardSkeleton>
                  <CardDetailsSkeleton type="FIRST_RELEASE_DATE" />
                </HorizontalCardSkeleton>
              ),
              15,
              "most_anticipated_skeleton"
            )}
          </ul>
        </FixedSizeCarousel>
        <FixedSizeCarousel>
          <div className="flex items-center mb-4 mt-20">
            <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
              Top Rated
            </h2>
            <MdChevronRight size={32} className="text-on-surface-heading" />
          </div>
          <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,minmax(164px,1fr))] md:grid-cols-[repeat(15,minmax(204px,1fr))] lg:grid-cols-[repeat(15,minmax(244px,1fr))] gap-4 overflow-x-auto carousel pr-4 lg:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
            {createListFromComponent(
              () => (
                <VerticalCardSkeleton>
                  <CardDetailsSkeleton type="RATING" />
                </VerticalCardSkeleton>
              ),
              15,
              "top_rated_games_skeleton"
            )}
          </ul>
        </FixedSizeCarousel>
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
      <div className="mt-20 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <FixedSizeCarousel>
          <div className="flex items-center mb-4">
            <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
              Upcoming Releases
            </h2>
            <MdChevronRight size={32} className="text-on-surface-heading" />
          </div>
          <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,200px)] md:grid-cols-[repeat(15,254px)] lg:grid-cols-[repeat(15,308px)] gap-4 pr-4 lg:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
            {createListFromComponent(
              () => (
                <HorizontalCardSkeleton>
                  <CardDetailsSkeleton type="FIRST_RELEASE_DATE" />
                </HorizontalCardSkeleton>
              ),
              15,
              "upcoming_releases_skeleton"
            )}
          </ul>
        </FixedSizeCarousel>
      </div>
    </main>
  );
}

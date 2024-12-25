import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";
import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameEvents } from "@/services/igdb";
import React from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";

const GamingEvents = async () => {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.gameEvents,
    getGameEvents
  );

  if (error) throw error;

  if (!data?.length) return;

  return (
    <section>
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
            Recent Events
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Recent Events
          </div>

          <CloseGameDialog style={{ top: "1.25rem" }} />
        </header>
        <div className="text-on-surface-body px-6 pb-6 max-w-full"></div>
      </SectionDialog>
      <FixedSizeCarousel>
        <ul className="inline-flex gap-4">
          {data.map((event) => (
            <li key={`gaming_event_${event.id}`}>
              <Card>
                <CardImage imgId={event.event_logo.image_id} />
                <CardDetails event={event} />
              </Card>
            </li>
          ))}
        </ul>
      </FixedSizeCarousel>
    </section>
  );
};

export default GamingEvents;

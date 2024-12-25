import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameEvents } from "@/services/igdb";
import React from "react";

const GamingEvents = async () => {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.gameEvents,
    getGameEvents
  );

  if (error) throw error;

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
      <DynamicSizeCarousel>
        <ul className="inline-flex gap-4">
          {/* {data.items.map((channel) => (
            <li key={`top_gaming_channel_${channel.id}`}>
              <a
                target="_blank"
                href={`https://www.youtube.com/${channel.snippet.customUrl}`}
              >
                <Card>
                  <CardImage imgSrc={channel.snippet.thumbnails.medium.url} />
                  <CardDetails channel={channel} />
                </Card>
              </a>
            </li>
          ))} */}
        </ul>
      </DynamicSizeCarousel>
    </section>
  );
};

export default GamingEvents;

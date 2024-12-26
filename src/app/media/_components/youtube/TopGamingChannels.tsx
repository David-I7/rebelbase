import { getTopGamingChannelsFacade } from "@/services/youtube";
import React from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

const TopGamingChannels = async ({ sectionId }: { sectionId: string }) => {
  const { data, error } = await getTopGamingChannelsFacade();

  if (error) throw error;

  if (!data?.items) return;

  return (
    <section
      className="scroll-mt-20 max-w-[1280px] mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:mx-auto"
      id={sectionId}
    >
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
            Top Creators
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Top Creators
          </div>

          <CloseGameDialog style={{ top: "1.25rem" }} />
        </header>
        <div className="text-on-surface-body px-6 pb-6 max-w-full"></div>
      </SectionDialog>
      <DynamicSizeCarousel>
        <ul className="inline-flex gap-4">
          {data.items.map((channel) => (
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
          ))}
        </ul>
      </DynamicSizeCarousel>
    </section>
  );
};

export default TopGamingChannels;

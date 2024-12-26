import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGamingMemes } from "@/services/apiLeague";
import React from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

const GamingMemes = async ({ sectionId }: { sectionId: string }) => {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.gameMemes,
    getGamingMemes
  );

  if (error) throw error;

  if (!data || !data.length) return;

  return (
    <section
      className="mt-20 scroll-mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)]"
      id={sectionId}
    >
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
            Memes
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Memes
          </div>

          <CloseGameDialog style={{ top: "1.25rem" }} />
        </header>
        <div className="text-on-surface-body px-6 pb-6 max-w-full">
          <ul className="flex flex-col items-center gap-16">
            {data.map((meme, index) => (
              <li key={`meme_${index}`} className="">
                <Card style={{ width: "244px" }}>
                  <CardImage
                    imgSrc={meme.url}
                    memeDescription={meme.description}
                  />
                  <h3 className="text-base line-clamp-2 text-ellipsis">
                    {meme.description}
                  </h3>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </SectionDialog>
      <DynamicSizeCarousel>
        <ul className="inline-flex gap-4 pr-4 md:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {data.map((meme, index) => (
            <li key={`meme_${index}`}>
              <Card>
                <CardImage
                  imgSrc={meme.url}
                  memeDescription={meme.description}
                />
                <h3 className="text-base line-clamp-2 text-ellipsis">
                  {meme.description}
                </h3>
              </Card>
            </li>
          ))}
        </ul>
      </DynamicSizeCarousel>
    </section>
  );
};

export default GamingMemes;

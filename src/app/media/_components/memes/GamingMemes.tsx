import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import CACHE_KEYS, { DEFAULT_CACHE_EXPIRATION } from "@/data/constants/cache";
import { unstable_cache } from "next/cache";
import { getGamingMemes } from "@/services/apiLeague";
import React from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

const cachedGetGamingMemes = unstable_cache(
  getGamingMemes,
  [CACHE_KEYS.gameMemes],
  { revalidate: DEFAULT_CACHE_EXPIRATION }
);

const GamingMemes = async () => {
  const { data, error } = await cachedGetGamingMemes();

  if (error) throw error;

  if (!data || !data.length) return;

  return (
    <>
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
          <ul className="flex flex-col items-center gap-20">
            {data.map((meme, index) => (
              <li
                key={`meme_${index}`}
                className="border-b last:border-b-0 border-solid border-b-outline-varient-lowest pb-20"
              >
                <Card style={{ width: "244px" }}>
                  <CardImage
                    imgSrc={meme.url}
                    memeDescription={meme.description}
                  />
                  <h3 className="text-base">{meme.description}</h3>
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
    </>
  );
};

export default GamingMemes;

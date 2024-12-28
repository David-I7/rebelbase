"use client";
import { GameData } from "@/interfaces/igdb";
import { getHeroVideo, getMedia } from "@/utils/dataTransformation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MediaDialogCarousel from "./MediaDialogCarousel";
import { MediaCarouselDialogContextProvider } from "../../../context/MediaCarouselDialogContext";
import MediaCarouselContent from "./MediaCarouselContent";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

const MediaSection = ({ game }: { game: GameData }) => {
  const media = getMedia(game);
  const heroVideo = getHeroVideo(game[0]["videos"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);

  const toggleDialog = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!heroVideo && !media?.artworks && !media?.screenshots) return;

  return (
    <section className="">
      <MediaCarouselDialogContextProvider
        hasHeroVideo={heroVideo ? true : false}
        itemCount={
          (media?.artworks.length || 0) +
          (media?.screenshots.length || 0) +
          (heroVideo ? 1 : 0)
        }
      >
        <DynamicSizeCarousel>
          <MediaCarouselContent
            gameName={game[0].name}
            toggleDialog={toggleDialog}
            media={media}
            heroVideo={heroVideo}
          />
        </DynamicSizeCarousel>
        <MediaDialogCarousel
          isOpen={isOpen}
          toggle={toggleDialog}
          ref={dialogRef}
          gameName={game[0].name}
          heroVideo={heroVideo}
          media={media}
        />
      </MediaCarouselDialogContextProvider>
    </section>
  );
};

export default MediaSection;

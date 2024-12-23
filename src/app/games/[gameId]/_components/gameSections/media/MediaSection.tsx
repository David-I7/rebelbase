"use client";
import { GameData } from "@/interfaces/igdb";
import { getHeroVideo, getMedia } from "@/utils/dataTransformation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MediaCarousel from "./MediaCarousel";
import TrailerVideo from "./TrailerVideo";
import MediaThumbnail from "./MediaThumbnail";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import MediaDialogCarousel from "./MediaDialogCarousel";

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
      <MediaCarousel>
        <ul className="inline-flex gap-4">
          {heroVideo && (
            <li className="flex-shrink-0 md:hidden aspect-video w-full max-w-[308px] relative">
              <DialogToggleOpen
                toggle={toggleDialog}
                label=""
                style={{
                  position: "absolute",
                  inset: "0",
                  padding: 0,
                  height: "auto",
                  borderRadius: "0.75rem",
                }}
              >
                <TrailerVideo heroVideo={heroVideo} gameName={game[0].name} />
              </DialogToggleOpen>
            </li>
          )}
          {media?.screenshots.length &&
            media.screenshots.map((screenshot) => (
              <li
                className="flex-shrink-0 relative max-w-[308px] lg:max-w-[565px]"
                key={`media_screenshot_${screenshot.imgId}`}
              >
                <DialogToggleOpen
                  toggle={toggleDialog}
                  label=""
                  style={{
                    position: "absolute",
                    inset: "0",
                    padding: 0,
                    height: "auto",
                    borderRadius: "0.75rem",
                  }}
                >
                  <MediaThumbnail
                    mediaType="screenshot"
                    imgId={screenshot.imgId}
                    gameName={game[0].name}
                  />
                </DialogToggleOpen>
              </li>
            ))}
          {media?.artworks.length &&
            media.artworks.map((screenshot) => (
              <li
                className="flex-shrink-0 relative max-w-[308px] lg:max-w-[565px]"
                key={`media_artwork_${screenshot.imgId}`}
              >
                <DialogToggleOpen
                  toggle={toggleDialog}
                  label=""
                  style={{
                    position: "absolute",
                    inset: "0",
                    padding: 0,
                    height: "auto",
                    borderRadius: "0.75rem",
                  }}
                >
                  <MediaThumbnail
                    mediaType="artwork"
                    imgId={screenshot.imgId}
                    gameName={game[0].name}
                  />
                </DialogToggleOpen>
              </li>
            ))}
        </ul>
      </MediaCarousel>
      <MediaDialogCarousel
        isOpen={isOpen}
        toggle={toggleDialog}
        ref={dialogRef}
        gameName={game[0].name}
        heroVideo={heroVideo}
        media={media}
      />
    </section>
  );
};

export default MediaSection;

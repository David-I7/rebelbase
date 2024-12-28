"use client";

import Dialog from "@/_components/primitives/dialog/Dialog";
import { Media, RelevantVideoData } from "@/utils/dataTransformation";
import React, { useContext } from "react";
import MediaThumbnail from "./MediaThumbnail";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { MediaCarouselDialogContext } from "../../../context/MediaCarouselDialogContext";

const MediaDialogCarousel = React.forwardRef(
  (
    {
      heroVideo,
      media,
      gameName,
      toggle,
      isOpen,
    }: {
      heroVideo?: RelevantVideoData;
      media?: Media;
      gameName: string;
      toggle: () => void;
      isOpen: boolean;
    },
    dialogRef: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const { handleNext, handlePrev, index, totalItems } = useContext(
      MediaCarouselDialogContext
    );

    return (
      <Dialog
        onClose={toggle}
        ref={dialogRef}
        customClass=""
        style={{
          width: "100%",
          maxWidth: "1024px",
          overflow: "unset",
          background: "transparent",
        }}
      >
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) toggle();
          }}
          className="relative sm:px-14"
        >
          <div className="overflow-hidden">
            <ul
              style={{ transform: `translateX(-${100 * index}%)` }}
              className="inline-flex transition-transform duration-200"
            >
              {heroVideo && isOpen && (
                <li className="flex-shrink-0 md:hidden relative min-w-full max-w-full">
                  <div className="rounded-xl overflow-hidden ">
                    <iframe
                      loading="lazy"
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${heroVideo.videoId}?&modestbranding=1&rel=0&mute=1`}
                      title={`${gameName} ${heroVideo.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </li>
              )}
              {media?.screenshots.length &&
                media.screenshots.map((screenshot) => (
                  <li
                    className="flex-shrink-0 relative min-w-full max-w-full select-none"
                    key={`media_screenshot_${screenshot.imgId}`}
                  >
                    <MediaThumbnail
                      mediaType="screenshot"
                      imgId={screenshot.imgId}
                      gameName={gameName}
                    />
                  </li>
                ))}
              {media?.artworks.length &&
                media.artworks.map((screenshot) => (
                  <li
                    className="flex-shrink-0 relative min-w-full max-w-full select-none"
                    key={`media_artwork_${screenshot.imgId}`}
                  >
                    <MediaThumbnail
                      mediaType="artwork"
                      imgId={screenshot.imgId}
                      gameName={gameName}
                    />
                  </li>
                ))}
            </ul>
          </div>
          {index > 0 && totalItems > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="z-10 grid place-content-center rounded-full h-14 w-14 absolute left-0 sm:left-[28px] [@media(min-width:1098px)]:-left-4 vertical-center text-white backdrop-blur-sm bg-background-blur-dark"
            >
              <MdChevronLeft size={40} />
            </button>
          )}
          {index < totalItems - 1 && totalItems > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="z-10 grid place-content-center rounded-full h-14 w-14 absolute right-0 sm:right-[28px] [@media(min-width:1098px)]:-right-4 vertical-center text-white backdrop-blur-sm bg-background-blur-dark"
            >
              <MdChevronRight size={40} />
            </button>
          )}
        </div>
      </Dialog>
    );
  }
);

MediaDialogCarousel.displayName = "MediaDialogCarousel";

export default MediaDialogCarousel;

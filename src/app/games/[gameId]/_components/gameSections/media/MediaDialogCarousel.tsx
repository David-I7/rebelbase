"use client";

import Dialog from "@/_components/primitives/dialog/Dialog";
import { Media, RelevantVideoData } from "@/utils/dataTransformation";
import React, { useEffect, useRef, useState } from "react";
import MediaThumbnail from "./MediaThumbnail";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useWindowSizeRangeSSRTrue } from "@/hooks/useWindowSizeRange";

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
    const inRangeMedium = useWindowSizeRangeSSRTrue(
      768,
      Number.POSITIVE_INFINITY,
      true
    );
    const [totalItems, setTotalItems] = useState(
      (media?.artworks?.length || 0) +
        (media?.screenshots?.length || 0) +
        (heroVideo ? 1 : 0)
    );
    const [index, setIndex] = useState<number>(0);

    const handleNext = () => {
      setIndex((prevIndex) => (prevIndex + 1) % totalItems);
    };
    const handlePrev = () => {
      setIndex((prevIndex) =>
        prevIndex === 0 ? totalItems - 1 : (prevIndex - 1) % totalItems
      );
    };

    useEffect(() => {
      if (heroVideo && inRangeMedium) {
        setTotalItems(
          (media?.artworks?.length || 0) + (media?.screenshots?.length || 0)
        );
      } else if (heroVideo && !inRangeMedium) {
        setTotalItems(
          (media?.artworks?.length || 0) + (media?.screenshots?.length || 0) + 1
        );
      }
    }, [inRangeMedium]);

    return (
      <Dialog
        onClose={toggle}
        ref={dialogRef}
        customClass=""
        style={{
          width: "100%",
          maxWidth: "1024px",
          background: "transparent",
          overflow: "unset",
        }}
      >
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) toggle();
          }}
          className="relative sm:mx-14 lg:mx-0"
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
              className="z-10 grid place-content-center rounded-full h-14 w-14 absolute left-0 sm:-left-[24px] lg:-left-20 vertical-center text-white backdrop-blur-sm bg-background-blur-light"
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
              className="z-10 grid place-content-center rounded-full h-14 w-14 absolute right-0 sm:-right-[24px] lg:-right-20 vertical-center text-white backdrop-blur-sm bg-background-blur-light"
            >
              <MdChevronRight size={40} />
            </button>
          )}
        </div>
      </Dialog>
    );
  }
);

export default MediaDialogCarousel;

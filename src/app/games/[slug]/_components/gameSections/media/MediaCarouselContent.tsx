import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import React, { useContext } from "react";
import MediaThumbnail from "./MediaThumbnail";
import TrailerVideo from "./TrailerVideo";
import { Media, RelevantVideoData } from "@/utils/dataTransformation";
import { MediaCarouselDialogContext } from "../../../context/MediaCarouselDialogContext";

type MediaCarouselContentProps = {
  media?: Media;
  toggleDialog: () => void;
  heroVideo?: RelevantVideoData;
  gameName: string;
};

const MediaCarouselContent = React.memo(
  ({
    media,
    toggleDialog,
    heroVideo,
    gameName,
    inRangeMedium,
    toggleIndex,
  }: MediaCarouselContentProps & {
    inRangeMedium: boolean;
    toggleIndex: (targetIndex: number) => void;
  }) => {
    return (
      <ul className="inline-flex gap-4">
        {heroVideo && (
          <li className="flex-shrink-0 md:hidden aspect-video w-full max-w-[308px] relative">
            <DialogToggleOpen
              toggle={() => {
                toggleIndex(0);
                toggleDialog();
              }}
              label=""
              style={{
                position: "absolute",
                inset: "0",
                padding: 0,
                height: "auto",
                borderRadius: "0.75rem",
              }}
            >
              <TrailerVideo heroVideo={heroVideo} gameName={gameName} />
            </DialogToggleOpen>
          </li>
        )}
        {media?.screenshots &&
          media?.screenshots.length > 0 &&
          media.screenshots.map((screenshot, index) => (
            <li
              className="flex-shrink-0 relative max-w-[308px] lg:max-w-[565px]"
              key={`media_screenshot_${screenshot.imgId}`}
            >
              <DialogToggleOpen
                toggle={() => {
                  if (inRangeMedium) {
                    toggleIndex(index);
                  } else {
                    toggleIndex(heroVideo ? index + 1 : index);
                  }
                  toggleDialog();
                }}
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
                  gameName={gameName}
                />
              </DialogToggleOpen>
            </li>
          ))}
        {media?.artworks &&
          media?.artworks.length > 0 &&
          media.artworks.map((screenshot, index) => (
            <li
              className="flex-shrink-0 relative max-w-[308px] lg:max-w-[565px]"
              key={`media_artwork_${screenshot.imgId}`}
            >
              <DialogToggleOpen
                toggle={() => {
                  console.log(index);
                  if (inRangeMedium) {
                    toggleIndex(
                      (media?.screenshots.length - 1 || 0) + index + 1
                    );
                  } else {
                    toggleIndex(
                      (media?.screenshots.length - 1 || 0) +
                        (heroVideo ? 1 : 0) +
                        index +
                        1
                    );
                  }
                  toggleDialog();
                }}
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
                  gameName={gameName}
                />
              </DialogToggleOpen>
            </li>
          ))}
      </ul>
    );
  }
);

export default function MediaCarouselContentMemo(
  props: MediaCarouselContentProps
) {
  const { inRangeMedium, toggleIndex } = useContext(MediaCarouselDialogContext);

  return (
    <MediaCarouselContent
      {...props}
      inRangeMedium={inRangeMedium}
      toggleIndex={toggleIndex}
    />
  );
}

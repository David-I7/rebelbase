import { GameData } from "@/interfaces/igdb";
import { getHeroVideo, getMedia } from "@/utils/dataTransformation";
import React from "react";
import MediaCarousel from "./MediaCarousel";
import TrailerVideo from "./TrailerVideo";
import MediaThumbnail from "./MediaThumbnail";

const MediaSection = ({ game }: { game: GameData }) => {
  const media = getMedia(game);
  const heroVideo = getHeroVideo(game[0]["videos"]);

  return (
    <section className="mt-16">
      <MediaCarousel>
        <ul className="inline-flex gap-4">
          <li className="flex-shrink-0">
            {heroVideo && (
              <TrailerVideo heroVideo={heroVideo} gameName={game[0].name} />
            )}
          </li>
          {media?.screenshots.length &&
            media.screenshots.map((screenshot) => (
              <li
                className="flex-shrink-0"
                key={`media_screenshot_${screenshot.imgId}`}
              >
                <MediaThumbnail
                  mediaType="screenshot"
                  imgId={screenshot.imgId}
                  gameName={game[0].name}
                />
              </li>
            ))}
          {media?.artworks.length &&
            media.artworks.map((screenshot) => (
              <li
                className="flex-shrink-0"
                key={`media_artwork_${screenshot.imgId}`}
              >
                <MediaThumbnail
                  mediaType="artwork"
                  imgId={screenshot.imgId}
                  gameName={game[0].name}
                />
              </li>
            ))}
        </ul>
      </MediaCarousel>
    </section>
  );
};

export default MediaSection;

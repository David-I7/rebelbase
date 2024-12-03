import { GameData } from "@/interfaces/igdb";
import React from "react";

const MediaSection = ({ game }: { game: GameData }) => {
  const media = getMedia(game);

  return <div>MediaSection</div>;
};

export default MediaSection;

type MediaType = {
  mediaType: string;
  imgId: number;
};

function getMedia(game: GameData): MediaType[] | undefined {
  const artworks = game[0]["artworks"];
  const screenShots = game[0]["artworks"];

  if (!artworks && !screenShots) return undefined;

  const maxLength =
    artworks?.length && screenShots?.length
      ? Math.max(artworks.length, screenShots.length)
      : artworks?.length
      ? artworks!.length
      : screenShots!.length;

  const result: MediaType[] = [];

  //we want screenshots then artworks

  for (let i = 0; i < maxLength; i++) {
    if (artworks) {
      if (artworks[i]) {
      }
    }
  }
}

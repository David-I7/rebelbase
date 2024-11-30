import { CardData } from "@/interfaces/igdb";

export function getCardTags(game: CardData): string[] {
  const tags: string[] = [];
  const TAG_COUNT = 2;

  if (game["genres"]) {
    for (let i = 0; i < game["genres"].length; i++) {
      tags.push(game["genres"][i].name);
      if (tags.length === TAG_COUNT) return tags;
    }
  }

  if (game["themes"]) {
    for (let i = 0; i < game["themes"].length; i++) {
      tags.push(game["themes"][i].name);
      if (tags.length === TAG_COUNT) return tags;
    }
  }

  return tags;
}

export function convertRating(rating?: number): string | undefined {
  if (!rating) return;
  // convert from 0-100 to 0-5 rating
  return (rating / 20).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

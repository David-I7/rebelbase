import {
  ageCategories,
  ageRatingImages,
  ageRatings,
} from "@/data/constants/igdbEnums";
import {
  AgeRating,
  CardData,
  InvolvedCompanies,
  Videos,
} from "@/interfaces/igdb";
import { StaticImageData } from "next/image";

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

type AgeRatingConversion = { name: string; imgSrc: StaticImageData };

export function getAgeRating(
  ageRating?: AgeRating
): AgeRatingConversion | undefined {
  if (!ageRating) return;

  for (let i = 0; i < ageRating.length; i++) {
    if (ageCategories[ageRating[i].category]) {
      if (ageRatings[ageRating[i].rating]) {
        const name = `${ageCategories[ageRating[i].category]} ${
          ageRatings[ageRating[i].rating]
        }`;
        return {
          name,
          imgSrc:
            ageRatingImages[ageRating[i].category][
              ageRatings[ageRating[i].rating]
            ],
        };
      }
    }
  }

  return;
}

export function getDeveloperCompany(involvedCompanies?: InvolvedCompanies): {
  developerCompanyId: number | undefined;
  developerCompanyName: string | undefined;
} {
  if (!involvedCompanies)
    return { developerCompanyId: undefined, developerCompanyName: undefined };

  let involvedCompanyDeveloperid!: number;
  let involvedCompanyDeveloperName!: string;

  for (let i = 0; i < involvedCompanies.length; i++) {
    if (involvedCompanies[i].developer) {
      involvedCompanyDeveloperid = involvedCompanies[i].company.id;
      involvedCompanyDeveloperName = involvedCompanies[i].company.name;
      break;
    }
  }

  return {
    developerCompanyId: involvedCompanyDeveloperid,
    developerCompanyName: involvedCompanyDeveloperName,
  };
}

export type RelevantVideoData = { name: string; videoId: string };

export function getHeroVideo(videos?: Videos): RelevantVideoData | undefined {
  if (!videos) return;

  const videoData: { [index: string]: RelevantVideoData[] } = {
    Trailer: [],
    "Game Play Trailer": [],
    "Release Date Trailer": [],
  };

  for (const video of videos) {
    if (videoData[video.name]) {
      if (video.name === "Trailer")
        return { name: video.name, videoId: video.video_id };
      videoData[video.name].push({ name: video.name, videoId: video.video_id });
    }
  }

  return videoData["Game Play Trailer"].length
    ? videoData["Game Play Trailer"][0]
    : videoData["Release Date Trailer"].length
    ? videoData["Release Date Trailer"][0]
    : undefined;
}

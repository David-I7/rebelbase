import {
  ageCategories,
  ageRatingImages,
  ageRatings,
} from "@/data/constants/igdbEnums";
import { AgeRating, CardData, InvolvedCompanies } from "@/interfaces/igdb";
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
  developerCompanyId: number | null;
  developerCompanyName: string | null;
} {
  if (!involvedCompanies)
    return { developerCompanyId: null, developerCompanyName: null };

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

import { socialLinksIcons } from "@/data/constants/igdbEnums";
import { GameData } from "@/interfaces/igdb";
import React from "react";

const AboutSocialLinks = ({ game }: { game: GameData }) => {
  if (!game[0]["websites"]) return;

  return (
    <section className="flex flex-wrap">
      {game[0].websites.map((link) => {
        const WebsiteLogo = socialLinksIcons[link.category];
        if (!WebsiteLogo) return;

        return (
          <div
            key={`${link.category}`}
            className="h-10 w-10 cursor-pointer rounded bg-surface-container-lowest hover:brightness-115 transition-brightness grid place-content-center"
          >
            {WebsiteLogo}
          </div>
        );
      })}
    </section>
  );
};

export default AboutSocialLinks;

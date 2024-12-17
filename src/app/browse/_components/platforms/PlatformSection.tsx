import Link from "next/link";
import React, { ReactElement } from "react";
import Card from "./Card";
import { platformSvg } from "../data/platformSvg";
import PlatformCardCarousel from "./PlatformCardCarousel";
import {
  convertedPlatformsKeys,
  platforms,
  uiFriendlyPlatformsMap,
} from "@/data/constants/filterEnums";

const PlatformSection = () => {
  const platformsJSX: ReactElement[] = [];

  Object.entries(convertedPlatformsKeys).map(([platformName, platformId]) => {
    platformsJSX.push(
      <li key={`platform_${platformId}`}>
        <Link href={`/platforms/${platformName}`}>
          <Card>
            <div
              className={`flex-1 flex items-center ${
                platformId === 14 ? "h-24 w-24" : "h-14 w-14"
              }`}
              dangerouslySetInnerHTML={{
                __html: platformSvg.get(
                  platformName as (typeof platforms)[number]
                )!.svg,
              }}
            ></div>
            <div className="font-medium font-body-s">
              {uiFriendlyPlatformsMap[platformName]}
            </div>
          </Card>
        </Link>
      </li>
    );
  });

  return (
    <section className="ml-4 md:ml-8 [@media(min-width:1344px)]:ml-0">
      <h1 className="mb-6">Platforms</h1>
      <PlatformCardCarousel>
        <ul className="inline-flex gap-4">{platformsJSX}</ul>
      </PlatformCardCarousel>
    </section>
  );
};

export default PlatformSection;

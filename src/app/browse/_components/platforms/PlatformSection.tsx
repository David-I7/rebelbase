import Link from "next/link";
import React, { ReactElement } from "react";
import Card from "./Card";
import { platformSvg } from "../data/platformSvg";
import PlatformCardCarousel from "./PlatformCardCarousel";

const PlatformSection = () => {
  const platforms: ReactElement[] = [];

  platformSvg.forEach((platformDetails, platformId) => {
    platforms.push(
      <li key={`platform_${platformId}`}>
        <Link href={`/platform/${platformDetails.name}`}>
          <Card>
            <div
              className={`flex-1 flex items-center ${
                platformId === 14 ? "h-24 w-24" : "h-14 w-14"
              }`}
              dangerouslySetInnerHTML={{ __html: platformDetails.svg }}
            ></div>
            <div className="font-medium">
              {platformId === 6 ? "Windows" : platformDetails.name}
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
        <ul className="inline-flex gap-4">{platforms}</ul>
      </PlatformCardCarousel>
    </section>
  );
};

export default PlatformSection;

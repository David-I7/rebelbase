import Link from "next/link";
import { platformSvg } from "./_components/data/platformSvg";
import Card from "./_components/platforms/Card";
import CardContent from "./_components/platforms/CardContent";
import { ReactElement } from "react";
import PlatformCardCarousel from "./_components/platforms/PlatformCardCarousel";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Browse({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  console.log(awaitedSearchParams);

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
              {platformId === 6 ? "PC (Windows)" : platformDetails.name}
            </div>
          </Card>
        </Link>
      </li>
    );
  });

  return (
    <main>
      <section>
        <h1>Platforms</h1>
        <PlatformCardCarousel>
          <ul className="inline-flex gap-4">{platforms}</ul>
        </PlatformCardCarousel>
      </section>
    </main>
  );
}

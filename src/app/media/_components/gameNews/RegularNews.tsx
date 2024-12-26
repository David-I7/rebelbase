import { GameNews } from "@/services/worldNewsApi";
import React, { useMemo } from "react";
import RegularArticle from "./Regular/RegularArticle";
import ArticleImage from "./Regular/ArticleImage";
import NewsSummary from "./NewsSummary";

const renderCount = 4;
const largestart = 3;

const RegularNews = ({ gameNews }: { gameNews: GameNews["news"] }) => {
  const RegularNewsArticles = useMemo(() => {
    const Articles: React.JSX.Element[] = [];
    for (let i = largestart; i < largestart + renderCount; i++) {
      Articles.push(
        <RegularArticle
          customClass={
            i === largestart
              ? "my-0"
              : i === largestart + 1
              ? "[@media(min-width:960px)]:my-0 my-4"
              : "my-4"
          }
          key={`regular_game_article_${gameNews[i].id}`}
        >
          <ArticleImage imgSrc={gameNews[i].image} />
          <NewsSummary
            orientation="landscape"
            details={gameNews[i].text}
            summary={gameNews[i].title}
          />
        </RegularArticle>
      );
    }
    return Articles;
  }, [gameNews]);

  return (
    <section
      className={`grid gap-x-6 mt-12 [@media(min-width:960px)]:grid-cols-2 [@media(min-width:960px)]:grid-rows-[1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr]`}
    >
      {RegularNewsArticles}
    </section>
  );
};

export default RegularNews;

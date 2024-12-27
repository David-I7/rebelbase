import React, { useMemo } from "react";
import { GameNews } from "@/services/worldNewsApi";
import HeroArticle from "./Hero/HeroArticle";
import ArticleImage from "./Hero/ArticleImage";
import NewsSummary from "./NewsSummary";

const largeCount = 3;

const HeroNews = ({ gameNews }: { gameNews: GameNews["news"] }) => {
  const HeroNewsArticles = useMemo(() => {
    const Articles: React.JSX.Element[] = [];
    for (let i = 0; i < largeCount; i++) {
      Articles.push(
        <HeroArticle key={`hero_game_article_${gameNews[i].id}`}>
          <ArticleImage
            publishDate={gameNews[i].publish_date}
            imgSrc={gameNews[i].image}
          />
          <NewsSummary
            orientation="portrait"
            details={gameNews[i].text}
            summary={gameNews[i].title}
          />
        </HeroArticle>
      );
    }
    return Articles;
  }, [gameNews]);

  return (
    <section className="grid grid-rows-[1fr_0_0] overflow-hidden sm:grid-cols-2 [@media(min-width:960px)]:grid-cols-3 gap-6 gap-y-0">
      {HeroNewsArticles}
    </section>
  );
};

export default HeroNews;

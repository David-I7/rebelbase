import React, { useContext, useMemo } from "react";
import { GameNewsContext } from "./context/GameNewsContext";
import { GameNews } from "@/services/worldNewsApi";
import HeroArticle from "./HeroNews/HeroArticle";
import ArticleImage from "./HeroNews/ArticleImage";
import NewsSummary from "./NewsSummary";

const smallCount = 1;
const mediumCount = 2;
const largeCount = 3;

const HeroNews = ({ gameNews }: { gameNews: GameNews }) => {
  const state = useContext(GameNewsContext);

  const HeroNewsArticles = useMemo(() => {
    const count = state.isSmall
      ? smallCount
      : state.isMedium
      ? mediumCount
      : largeCount;
    const Articles: React.JSX.Element[] = [];
    for (let i = 0; i < count; i++) {
      Articles.push(
        <HeroArticle>
          <ArticleImage imgSrc={gameNews.news[i].image} />
          <NewsSummary
            orientation="portrait"
            details={gameNews.news[i].text}
            summary={gameNews.news[i].title}
          />
        </HeroArticle>
      );
    }
    return Articles;
  }, [state]);

  return <section className="flex gap-6">{HeroNewsArticles}</section>;
};

export default HeroNews;

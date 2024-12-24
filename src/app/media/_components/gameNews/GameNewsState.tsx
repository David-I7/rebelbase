"use client";
import dynamic from "next/dynamic";
import HeroNews from "./HeroNews";
import RegularNews from "./RegularNews";
import { GameNews } from "@/services/worldNewsApi";
const GameNewsContextProvider = dynamic(
  () =>
    import("@/app/media/_components/gameNews/context/GameNewsContext").then(
      (mod) => mod.GameNewsContextProvider
    ),
  { ssr: false }
);

const GameNewsState = ({ gameNews }: { gameNews: GameNews }) => {
  return (
    <GameNewsContextProvider>
      <HeroNews gameNews={gameNews} />
      <RegularNews gameNews={gameNews} />
    </GameNewsContextProvider>
  );
};

export default GameNewsState;

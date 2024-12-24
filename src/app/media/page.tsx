import { Suspense } from "react";
import GameNewsData from "./_components/gameNews/GameNewsData";

export default function Media() {
  return (
    <main className="mx-4 md:mx-8 [@media(min-width:1344px)]:mx-auto">
      <Suspense fallback={<>loading...</>}>
        <GameNewsData />
      </Suspense>
    </main>
  );
}

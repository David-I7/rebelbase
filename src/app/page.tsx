import { getTopNewReleases } from "@/services/igdb";

export default async function Home() {
  getTopNewReleases();
  return <main className=""></main>;
}

import FilledButton from "./_components/buttons/FilledButton";
import SkipLink from "./_components/buttons/SkipLink";
import SuggestionChip from "./_components/buttons/SuggestionChip";

export default function Home() {
  return (
    <main className="">
      <FilledButton label="hello" />
      <SuggestionChip href="/" label="hello" />
      <div>
        <SkipLink label="one" sectionId="#one" />
        <SkipLink label="two" sectionId="#two" />
      </div>
      <section id="one" className="h-screen">
        Welcome
      </section>
      <section id="two" className="h-screen">
        Welcome again
      </section>
    </main>
  );
}

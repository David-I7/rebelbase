import { CardData } from "@/interfaces/igdb";
import React from "react";
import VerticalList from "./VerticalList";
import VerticalRay from "@/_components/VerticalRay";
import { MdChevronRight } from "react-icons/md";

type VerticalListSectionProps = {
  firstSectionData?: CardData[];
  secondSectionData?: CardData[];
  thirdSectionData?: CardData[];
  firstSectionHeading: string;
  secondSectionHeading: string;
  thirdSectionHeading: string;
};

const VerticalListSection = ({
  firstSectionData,
  secondSectionData,
  thirdSectionData,
  firstSectionHeading,
  secondSectionHeading,
  thirdSectionHeading,
}: VerticalListSectionProps) => {
  return (
    <section className="flex gap-6 overflow-x-auto mt-12">
      <section className="flex flex-col flex-1">
        <h2 className="flex items-center gap-2 mb-4 text-2xl">
          {firstSectionHeading} <MdChevronRight size={32} />
        </h2>
        <VerticalList gameData={firstSectionData} />
      </section>

      <VerticalRay />
      <section className="flex flex-col flex-1">
        <h2 className="flex items-center gap-2 mb-4 text-2xl">
          {secondSectionHeading} <MdChevronRight size={32} />
        </h2>
        <VerticalList gameData={secondSectionData} />
      </section>
      <VerticalRay />
      <section className="flex flex-col flex-1">
        <h2 className="flex items-center gap-2 mb-4 text-2xl">
          {thirdSectionHeading} <MdChevronRight size={32} />
        </h2>
        <VerticalList gameData={thirdSectionData} />
      </section>
    </section>
  );
};

export default VerticalListSection;

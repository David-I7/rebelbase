import { CardData } from "@/interfaces/igdb";
import React from "react";
import VerticalList from "./VerticalList";
import VerticalRay from "@/_components/VerticalRay";

type VerticalListSectionProps = {
  firstSectionData?: CardData[];
  secondSectionData?: CardData[];
  thirdSectionData?: CardData[];
};

const VerticalListSection = ({
  firstSectionData,
  secondSectionData,
  thirdSectionData,
}: VerticalListSectionProps) => {
  return (
    <div className="flex gap-6 overflow-x-auto">
      <VerticalList gameData={firstSectionData} />
      <VerticalRay />

      <VerticalList gameData={secondSectionData} />
      <VerticalRay />
      <VerticalList gameData={thirdSectionData} />
    </div>
  );
};

export default VerticalListSection;

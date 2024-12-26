import Dot from "@/_components/Dot";
import HeroCard from "@/app/_components/gameRepresentation/hero/HeroCard";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const HeroSectionSkeleton = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <button className="z-10 grid place-content-center rounded-full h-10 w-10 absolute left-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark ">
          <MdChevronLeft size={40} />
        </button>
        <button className="z-10 grid place-content-center rounded-full h-10 w-10 absolute right-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark">
          <MdChevronRight size={40} />
        </button>
        <ul className={`hero-carousel relative isolate`}>
          {Array.from({ length: 5 }, (_, index) => {
            const position: number = index;

            let className =
              "absolute top-0 left-2/4 cursor-pointer hero-card transiton-carousel-item ";

            if (position === 3) {
              className +=
                "[transform:translateX(-50%)_scale(0.85)] sm:hover:[transform:translateX(-78%)_scale(0.88)] sm:[transform:translateX(-75%)_scale(0.85)] blur-sm hover:blur-0 brightness-[85%] hover:brightness-100 z-20"; //hover:opacity-95 opactity-85
            } else if (position === 4) {
              className +=
                "[transform:translateX(-50%)_scale(0.7)] lg:hover:[transform:translateX(-97%)_scale(0.72)] lg:[transform:translateX(-95%)_scale(0.7)] blur-sm hover:blur-0 brightness-[70%] hover:brightness-100 z-10"; //hover:opacity-80 opactity-70
            } else if (position === 2) {
              className +=
                "[transform:translateX(-50%)_scale(0.7)] lg:hover:[transform:translateX(-3%)_scale(0.72)] lg:[transform:translateX(-5%)_scale(0.7)] blur-sm hover:blur-0 brightness-[70%] hover:brightness-100 z-10"; //hover:opacity-80 opactity-70
            } else if (position === 1) {
              className +=
                "[transform:translateX(-50%)_scale(0.85)] sm:hover:[transform:translateX(-22%)_scale(0.88)] sm:[transform:translateX(-25%)_scale(0.85)] blur-sm hover:blur-0 brightness-[85%] hover:brightness-100 z-20"; //hover:opacity-95 opactity-85
            } else if (position === 0) {
              className += "[transform:translateX(-50%)_scale(1)] z-30";
            } else {
              className +=
                "opacity-0 pointer-events-none transition-opacity [transform:translateX(-50%)_scale(1)]";
            }
            return (
              <li
                className={className}
                key={`hero_carousel_item_skeleton_${index}}`}
              >
                <HeroCard>
                  <div
                    className={`bg-surface-container-normal max-w-[400px] aspect-[3/4] rounded-xl overflow-hidden  select-none`}
                  ></div>
                  <div className="absolute z-20 backdrop-blur-sm py-2 px-3 bottom-0 left-0 right-0 rounded-bl-xl rounded-br-xl">
                    <div className="mb-2 flex items-center gap-x-2 gap-y-0 ">
                      <div className="h-[13px] rounded w-20 bg-surface-container-high"></div>

                      <Dot
                        style={{
                          backgroundColor:
                            "var(--color-surface-container-high)",
                        }}
                      />

                      <div className="h-[13px] rounded w-20 bg-surface-container-high"></div>
                    </div>

                    <div
                      className={`h-7 rounded bg-surface-container-high w-2/3`}
                    ></div>

                    <div className="flex items-center gap-[2px] mt-3">
                      <div className="h-[18px] w-8 rounded-sm bg-surface-container-high"></div>
                      <div className="h-[18px] w-[18px]  rounded-lg bg-surface-container-high"></div>
                    </div>
                  </div>
                </HeroCard>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 mb-4 h-2">
        <button className="w-2 h-2 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
        <button className="w-1 h-1 rounded-full bg-primary transition-background duration-300"></button>
      </div>
    </>
  );
};

export default HeroSectionSkeleton;

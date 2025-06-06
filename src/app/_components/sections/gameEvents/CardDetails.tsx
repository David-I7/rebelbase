import { EventData } from "@/interfaces/igdb";
import React from "react";
import format from "date-fns/format";
import Dot from "@/_components/Dot";

const CardDetails = ({
  event,
  type,
}: {
  event: EventData;
  type: "carousel" | "details";
  toggle?: () => void;
}) => {
  const localeDate = event.start_time
    ? new Date(event.start_time * 1000).toString()
    : "";

  return (
    <div>
      {type === "carousel" && (
        <>
          {localeDate && (
            <div className="flex flex-wrap items-center gap-2 font-body-xs text-on-surface-body-varient-low">
              <div>{format(localeDate, "dd MMM")}</div>
              <Dot
                style={{
                  background: "var(--color-on-surface-body-varient-low)",
                }}
              />
              <div>{format(localeDate, "HH:mm")}</div>
            </div>
          )}
          <h3 className="text-base line-clamp-2 text-ellipsis mb-1">
            {event.name}
          </h3>
          <div className="font-body-s">
            Games showcased - {event.games?.length ?? 0}
          </div>
        </>
      )}
      {type === "details" && (
        <>
          <div className="flex justify-between mt-3">
            {localeDate && (
              <div className="flex flex-wrap items-center gap-2 font-body-s text-on-surface-body-varient-low">
                <div>{format(localeDate, "dd MMM")}</div>
                <Dot
                  style={{
                    background: "var(--color-on-surface-body-varient-low)",
                  }}
                />
                <div>{format(localeDate, "HH:mm")}</div>
              </div>
            )}
          </div>
          <h3 className="text-xl line-clamp-2 text-ellipsis mb-4">
            {event.name}
          </h3>
        </>
      )}
    </div>
  );
};

export default CardDetails;

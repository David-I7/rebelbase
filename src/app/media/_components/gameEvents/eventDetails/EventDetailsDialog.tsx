"use client";
import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import { EventData } from "@/interfaces/igdb";
import React, { useEffect, useRef, useState } from "react";
import CardImage from "../CardImage";
import CardDetails from "../CardDetails";
import HorizontalRay from "@/_components/HorizontalRay";
import GamesShowcasedAccordion from "./GamesShowcasedAccordion";
import EventLinks from "./EventLinks";
import { MdOpenInNew } from "react-icons/md";
import { findParentByTagname } from "@/utils/dom";

type DialogProps = {
  event: EventData;
};

const EventDetailsDialog = React.memo(({ event }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (state?: boolean) => {
    if (typeof state === "boolean") {
      setIsOpen(state);
      return;
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // This observer takes care of closing the dialog
    // This kepes the browser and app state in sync

    const observer = new MutationObserver(
      (mutationRecord: MutationRecord[]) => {
        if (mutationRecord[0].attributeName === "open") {
          const target = mutationRecord[0].target as HTMLDialogElement;
          if (!target.open) {
            toggle(false);
          }
        }
      }
    );

    observer.observe(dialogRef.current!, {
      attributes: true,
      attributeFilter: ["open"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);
  return (
    <DialogToggleOpen
      style={{
        padding: 0,
        position: "absolute",
        inset: 0,
        height: "auto",
      }}
      toggle={toggle}
      label={""}
    >
      <Dialog
        rest={{
          onClickCapture: (e: MouseEvent) => {
            if (!e.target) return;
            const anchorTag = findParentByTagname(e.target as HTMLElement, "A");

            if (!anchorTag) return;
            toggle(false);
          },
        }}
        customClass="mx-0 w-full [@media(min-width:380px)]:w-[calc(100%_-_48px)] [@media(min-width:380px)_and_(max-width:737px)]:mx-6 [@media(min-width:737px)]:mx-auto scroll-hidden"
        style={{ maxWidth: "689px" }}
        ref={dialogRef}
      >
        {isOpen && (
          <>
            <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
              <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
                Event details
              </div>

              <CloseGameDialog style={{ top: "1.25rem" }} />
            </header>
            <div className="text-on-surface-body px-6 pb-6 max-w-full">
              <div className="grid">
                <CardImage
                  type="large"
                  imgId={event.event_logo.image_id}
                  maxWidth="100%"
                />
                <CardDetails toggle={toggle} type="details" event={event} />
                <p className="font-body-s">{event.description}</p>
                {event.live_stream_url && (
                  <a
                    href={event.live_stream_url}
                    className="rounded-full text-link font-medium font-body-s flex gap-2 h-10 items-center hover:brightness-115 transition-brightness mt-4"
                    target="_blank"
                    onClickCapture={(e) => {
                      e.stopPropagation();
                      toggle?.();
                    }}
                  >
                    View Livestream
                    <MdOpenInNew size={18} />
                  </a>
                )}
              </div>

              <HorizontalRay style={{ marginBlock: "1.5rem" }} />
              <div className="font-body-s">
                <h3 className="font-body-s font-medium text-on-surface-body mb-4">
                  Games Showcased - {event.games.length}
                </h3>
                <GamesShowcasedAccordion event={event} />
              </div>
              {event["event_networks"] && (
                <>
                  <HorizontalRay style={{ marginBlock: "1.5rem" }} />
                  <div className="font-body-s">
                    <h3 className="font-body-s font-medium text-on-surface-body mb-2">
                      Links
                    </h3>
                    <EventLinks links={event.event_networks} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Dialog>
    </DialogToggleOpen>
  );
});

EventDetailsDialog.displayName = "EventDetailsDialog";

export default EventDetailsDialog;

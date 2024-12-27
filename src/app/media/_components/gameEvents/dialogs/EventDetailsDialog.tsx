"use client";
import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import { EventData } from "@/interfaces/igdb";
import React, { useEffect, useRef, useState } from "react";
import CardImage from "../CardImage";
import CardDetails from "../CardDetails";
import OutlineButton from "@/_components/primitives/buttons/OutlineButton";
import { MdOpenInNew } from "react-icons/md";
import VerticalRay from "@/_components/VerticalRay";
import HorizontalRay from "@/_components/HorizontalRay";

type DialogProps = {
  event: EventData;
};

const EventDetailsDialog = React.memo(({ event }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (state?: boolean) => {
    if (state) {
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
        console.log(mutationRecord[0]);
        if (mutationRecord[0].attributeName === "open") {
          const target = mutationRecord[0].target as HTMLDialogElement;
          if (!target.open) {
            console.log("running");
            toggle(false);
          }
        }
      }
    );

    observer.observe(dialogRef.current!, { attributes: true });

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
              <div className="grid gap-3">
                <CardImage
                  type="large"
                  imgId={event.event_logo.image_id}
                  style={{ maxWidth: "100%" }}
                />
                <CardDetails type="details" event={event} />
                {event.live_stream_url && (
                  <a
                    href={event.live_stream_url}
                    className="rounded-full text-link font-medium font-body-s flex gap-2 h-10 items-center"
                    target="_blank"
                    onClickCapture={(e) => {
                      e.stopPropagation();
                      toggle();
                    }}
                  >
                    View Livestream
                    <MdOpenInNew size={18} />
                  </a>
                )}
              </div>
              <HorizontalRay />
              <div className="font-body-s">
                <h3 className="text-base mb-4">About this event</h3>
                {event.description}
              </div>
            </div>
          </>
        )}
      </Dialog>
    </DialogToggleOpen>
  );
});

export default EventDetailsDialog;

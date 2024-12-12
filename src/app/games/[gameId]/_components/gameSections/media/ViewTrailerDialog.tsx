"use client";
import Dialog from "@/_components/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/dialog/DialogToggle";
import { RelevantVideoData } from "@/utils/dataTransformation";
import React, { useEffect, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";

const ViewTrailerDialog = ({
  heroVideo,
  gameName,
}: {
  heroVideo: RelevantVideoData;
  gameName: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);

  const toggleDialogOpen = () => {
    setIsOpen(true);
  };
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <DialogToggleOpen
      extendedClass="text-on-surface-heading backdrop-blur-sm bg-[rgba(0,0,0,0.15)]"
      toggle={toggleDialogOpen}
      label="View Trailer"
      leadingIcon={<MdPlayArrow size={18} />}
    >
      <Dialog
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        ref={dialogRef}
        customClass=""
        style={{
          width: "100%",
          maxWidth: "1024px",
          background: "transparent",
        }}
      >
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(!isOpen);
          }}
          className="overflow-hidden [@media(max-width:1072px)]:px-6"
        >
          {isOpen && (
            <iframe
              loading="eager"
              className="aspect-video w-full rounded-3xl"
              src={`https://www.youtube.com/embed/${heroVideo.videoId}?&modestbranding=1&rel=0&mute=0`}
              title={`${gameName} ${heroVideo.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </Dialog>
    </DialogToggleOpen>
  );
};

export default ViewTrailerDialog;

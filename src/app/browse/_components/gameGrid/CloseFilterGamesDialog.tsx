"use client";

import { DialogToggleClose } from "@/_components/dialog/DialogToggle";
import { MouseEvent } from "react";

const CloseFilterGamesDialog = () => {
  return (
    <DialogToggleClose
      toggle={(e: MouseEvent) => {
        const dialog = e.currentTarget.parentElement!.parentElement!
          .parentElement! as HTMLDialogElement;
        dialog.close();
      }}
    />
  );
};

export default CloseFilterGamesDialog;

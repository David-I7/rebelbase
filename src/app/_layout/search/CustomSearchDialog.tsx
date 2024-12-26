import React, { MouseEvent, ReactNode, useEffect, useRef } from "react";

const offsetY = 80;
const offsetX = 72 + 20; //default scrollbar width;
const dialogCloseDuration = 150;
const CustomSearchDialog = React.forwardRef(
  (
    {
      children,
      toggle,
      isOpen,
    }: {
      children: ReactNode;
      isOpen: boolean;
      toggle: () => void;
    },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const isTimedOut = useRef<boolean>(false);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isTimedOut.current === true) return;
        const dialogRef = (ref as React.RefObject<HTMLDialogElement>).current!;
        const dialogHeight = dialogRef.offsetHeight!;
        if (e.clientY > offsetY) {
          if (e.clientY > offsetY + dialogHeight) {
            dialogRef.classList.remove("dialogOpen");
            dialogRef.classList.add("dialogClose");
            setTimeout(() => {
              dialogRef.classList.remove("dialogClose");
              dialogRef.close();
              toggle();
              isTimedOut.current === false;
            }, dialogCloseDuration + 10);
          }
        } else if (e.clientX < window.innerWidth - offsetX) {
          dialogRef.classList.remove("dialogOpen");
          dialogRef.classList.add("dialogClose");
          setTimeout(() => {
            dialogRef.classList.remove("dialogClose");
            dialogRef.close();
            toggle();
            isTimedOut.current === false;
          }, dialogCloseDuration + 10);
        }
      };
      const handleMouseMoveWrapper = (e: Event) =>
        handleMouseMove(e as unknown as MouseEvent);
      if (isOpen) {
        window.addEventListener("mousemove", handleMouseMoveWrapper);
      }

      return () => {
        if (isOpen) {
          window.removeEventListener("mousemove", handleMouseMoveWrapper);
        }
      };
    }, [isOpen]);

    return (
      <dialog
        ref={ref}
        className={`${
          isOpen ? "dialogOpen" : ""
        } top-20 m-0 z-30 left-0 w-full max-w-full min-h-[50%] bg-surface-container-lowest backdrop:bg-[rgba(0,0,0,0.38)] backdrop:backdrop-blur-sm backdrop:top-20 text-inherit`}
      >
        {children}
      </dialog>
    );
  }
);

export default CustomSearchDialog;

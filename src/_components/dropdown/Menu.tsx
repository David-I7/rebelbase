import React, { MouseEvent, ReactNode, useEffect, useRef } from "react";

const Menu = ({
  children,
  style,
  extendedClass,
  isOpen,
  id,
  toggle,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  extendedClass?: string;
  isOpen: boolean;
  id: string;
  toggle: (e: MouseEvent) => void;
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (isOpen) {
      const margin = 8;
      const menuHeight = menuRef.current!.offsetHeight;
      const parentCoord =
        menuRef.current!.parentElement!.getBoundingClientRect();

      //check bottom overflow
      if (parentCoord.bottom + menuHeight + margin > window.innerHeight) {
        // check top overflow
        if (parentCoord.top + menuHeight + margin < 0) {
          // set default to bottom if top and bottom are overflowing
          menuRef.current!.style.bottom = `${-margin}px`;
          menuRef.current!.style.transform = `translateY(100%)`;
          return;
        }
        menuRef.current!.style.top = `${-margin}px`;
        menuRef.current!.style.transform = `translateY(-100%)`;
        return;
      }

      menuRef.current!.style.bottom = `${-margin}px`;
      menuRef.current!.style.transform = `translateY(100%)`;
    }
  }, [isOpen]);

  return (
    <ul
      onClick={toggle}
      ref={menuRef}
      id={id}
      style={style}
      className={`${extendedClass} ${
        isOpen ? "visible" : "hidden"
      } absolute rounded-xl bg-surface-container-normal p-1 min-w-full`}
    >
      {children}
    </ul>
  );
};

export default Menu;

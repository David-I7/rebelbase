"use client";
import SkipLink from "@/_components/primitives/buttons/SkipLink";
import React, { useEffect, useRef, useState } from "react";

const SkipSections = ({
  sectionIds,
  labels,
  customClass,
}: {
  sectionIds: Readonly<string[]>;
  labels: Readonly<string[]>;
  customClass?: string;
}) => {
  const [activeLink, setActiveLink] = useState<string>(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const createObserver = (rootMargin: string) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (changedEntries: IntersectionObserverEntry[]) => {
        console.log(changedEntries);
        changedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current!.observe(element);
    });
  };

  useEffect(() => {
    let windowHeight = window.innerHeight;

    const handleResize = () => {
      if (windowHeight === window.innerHeight) return;
      windowHeight = window.innerHeight;
      createObserver(`0px 0px -${windowHeight - 80}px 0px`);
    };

    createObserver(`0px 0px -${windowHeight - 80}px 0px`);

    window.addEventListener("resize", handleResize);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [sectionIds]);

  return (
    <div className={`${customClass} py-6 flex`}>
      {sectionIds.map((id, i) => (
        <SkipLink
          key={id}
          isActive={activeLink === id}
          sectionId={id}
          label={labels[i]}
        />
      ))}
    </div>
  );
};

export default SkipSections;

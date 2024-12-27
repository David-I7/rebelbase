"use client";
import SkipLink from "@/_components/primitives/buttons/SkipLink";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (changedEntries: IntersectionObserverEntry[]) => {
        changedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-81px 0px -100% 0px",
      }
    );

    sectionIds.forEach((id) =>
      sectionObserver.observe(document.getElementById(id)!)
    );

    return () => sectionObserver.disconnect();
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

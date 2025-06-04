import { eventLinks } from "@/data/constants/gamePageEnums";
import { EventData } from "@/interfaces/igdb";
import React from "react";

const EventLinks = ({
  links,
}: {
  links: Required<EventData>["event_networks"];
}) => {
  return (
    <ul className="flex flex-wrap">
      {links.map((link) => (
        <li
          key={`network_type_link_${link.id}`}
          className="h-10 w-10 hover:brightness-115 transition-brightness cursor-pointer grid place-content-center"
        >
          <a
            onClick={(e) => {
              e.stopPropagation();
            }}
            target="_blank"
          >
            {
              //@ts-ignore
              eventLinks[link.network_type]
            }
          </a>
        </li>
      ))}
    </ul>
  );
};

export default EventLinks;

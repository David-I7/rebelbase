import { GameNews } from "@/services/worldNewsApi";
import { format } from "date-fns";

import React from "react";
import { MdOpenInNew } from "react-icons/md";

const ArticleDetails = ({
  article,
  toggle,
}: {
  article: GameNews["news"][number];
  toggle: (state?: boolean) => void;
}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between font-body-s items-center text-on-surface-body-varient-low">
        {format(article.publish_date, "dd MMM, yyyy")}
      </div>
      <h3 className="text-xl mb-4">{article.title}</h3>

      {article.url && (
        <a
          href={article.url}
          className="rounded-full text-link font-medium font-body-s flex gap-2 h-10 items-center hover:brightness-115 transition-brightness"
          target="_blank"
          onClickCapture={(e) => {
            e.stopPropagation();
            toggle(false);
          }}
        >
          View Original Post
          <MdOpenInNew size={18} />
        </a>
      )}
    </div>
  );
};

export default ArticleDetails;

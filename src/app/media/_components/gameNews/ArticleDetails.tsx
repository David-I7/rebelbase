import { GameNews } from "@/services/worldNewsApi";
import { format } from "date-fns";

import React from "react";

const ArticleDetails = ({ article }: { article: GameNews["news"][number] }) => {
  return (
    <div>
      <h3 className="text-xl">{article.title}</h3>
      <div>
        {format(article.publish_date, "dd MMM, yyyy")}
        {article.authors}
      </div>
    </div>
  );
};

export default ArticleDetails;

"use client";
import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import { GameNews } from "@/services/worldNewsApi";
import React, { useEffect, useRef, useState } from "react";
import ArticleDetails from "./ArticleDetails";
import HorizontalRay from "@/_components/HorizontalRay";

const NewsArticleDialog = React.memo(
  ({ article }: { article: GameNews["news"][number] }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = (state?: boolean) => {
      if (typeof state === "boolean") {
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
          if (mutationRecord[0].attributeName === "open") {
            const target = mutationRecord[0].target as HTMLDialogElement;
            if (!target.open) {
              toggle(false);
            }
          }
        }
      );

      observer.observe(dialogRef.current!, {
        attributes: true,
        attributeFilter: ["open"],
      });

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
              <header className="sticky h-20 px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
                <CloseGameDialog style={{ top: "1.25rem" }} />
              </header>
              <div className="text-on-surface-body px-6 pb-6 max-w-full">
                <div>
                  <img
                    className="w-full aspect-video"
                    alt="article cover"
                    loading="eager"
                    width={308}
                    height={545}
                    src={article.image}
                  />

                  <ArticleDetails toggle={toggle} article={article} />
                  <HorizontalRay style={{ marginBlock: "1.5rem" }} />
                  {article.authors && article.authors.length && (
                    <div className="mb-6 font-body-s text-on-surface-heading-varient font-medium">
                      Article written by {formatAuthors(article.authors)}
                    </div>
                  )}
                  <div className="grid gap-6">
                    {getArticleParagraphs(article.text).map((paragraph, i) => (
                      <p
                        key={`news_article_p_${i}`}
                        className="font-body-s"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      ></p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </Dialog>
      </DialogToggleOpen>
    );
  }
);

export default NewsArticleDialog;

NewsArticleDialog.displayName = "NewsArticleDialog";

function getArticleParagraphs(articleText: string): string[] {
  return articleText.split(/\n\s/);
}

function formatAuthors(authors: string[]): string {
  if (authors.length === 1) return authors[0];
  else if (authors.length === 2) return authors.join(" and ");
  else
    return `${authors.slice(0, authors.length - 2).join(", ")} and ${
      authors[authors.length - 1]
    }`;
}

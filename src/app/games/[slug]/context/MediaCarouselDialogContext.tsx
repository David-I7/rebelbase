import { useWindowSizeRangeSSRTrue } from "@/hooks/useWindowSizeRange";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type InitContextValue = ReturnType<typeof useContext>;

const InitContextValue: InitContextValue = {
  toggleIndex: (targetIndex: number) => {},
  index: 0,
  totalItems: 0,
  handleNext: () => {},
  handlePrev: () => {},
  inRangeMedium: false,
};

export const MediaCarouselDialogContext = createContext(InitContextValue);

const useContext = ({ itemCount, hasHeroVideo }: Props) => {
  const inRangeMedium = useWindowSizeRangeSSRTrue(
    768,
    Number.POSITIVE_INFINITY,
    false
  );
  const [totalItems, setTotalItems] = useState(itemCount);
  const [index, setIndex] = useState<number>(0);

  const handleNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }, [totalItems]);
  const handlePrev = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : (prevIndex - 1) % totalItems
    );
  }, [totalItems]);

  useEffect(() => {
    if (hasHeroVideo && inRangeMedium) {
      setTotalItems(itemCount - 1);
      if (index === itemCount - 1) {
        setIndex(itemCount - 2);
      }
    } else if (hasHeroVideo && !inRangeMedium) {
      setTotalItems(itemCount);
      setIndex((prev) => prev + 1);
    }
  }, [inRangeMedium]);

  const toggleIndex = useCallback(
    (targetIndex: number) => {
      if (index === targetIndex) return;
      setIndex(targetIndex);
    },
    [index]
  );

  return {
    toggleIndex,
    handleNext,
    handlePrev,
    inRangeMedium,
    index,
    totalItems,
  };
};

type Props = {
  itemCount: number;
  hasHeroVideo: boolean;
};

export function MediaCarouselDialogContextProvider({
  children,
  itemCount,
  hasHeroVideo,
}: Props & { children: ReactNode }) {
  return (
    <MediaCarouselDialogContext.Provider
      value={useContext({ itemCount, hasHeroVideo })}
    >
      {children}
    </MediaCarouselDialogContext.Provider>
  );
}

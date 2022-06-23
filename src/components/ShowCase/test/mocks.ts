import type { ResponseResult } from "../types";

const buildResponseResult = (
  count = 25,
  identifier = "default"
): { cards: ResponseResult } => {
  const cardSkeleton = {
    imageUrl: "skeletonImageUrl.png",
  };

  const cardList = [];

  for (let i = 0; i < count; i++) {
    cardList.push({
      ...cardSkeleton,
      ...{
        name: `Skeleton Card Name ${i} ${identifier}`,
        id: `skeleton-id-${i}-${identifier}`,
      },
    });
  }

  return { cards: cardList };
};

export { buildResponseResult };

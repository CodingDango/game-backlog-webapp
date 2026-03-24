import { useMemo } from "react";

interface UsePaginationProps {
  gamesCount: number;
  page: number;
  createPageUrl: (page: number) => string;
  gamesPerPage: number;
  pageWindowSize?: number;
}

export function usePagination({
  gamesCount,
  page,
  createPageUrl,
  gamesPerPage,
  pageWindowSize = 5,
}: UsePaginationProps) {
  return useMemo(() => {
    if (!gamesCount) return {};

    const totalPages = Math.ceil(gamesCount / gamesPerPage);
    const halfWindow = Math.floor(pageWindowSize / 2);

    let startPage = page - halfWindow;
    let endPage = page + halfWindow;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pageWindowSize, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - pageWindowSize + 1);
    }

    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ link: createPageUrl(i), pageNumber: i });
    }

    return {
      pages,
      previousLink: page > 1 ? createPageUrl(page - 1) : undefined,
      nextLink: page < totalPages ? createPageUrl(page + 1) : undefined,
      showEndEllipsis: endPage < totalPages,
    };
  }, [gamesCount, page, createPageUrl, pageWindowSize, gamesPerPage]);
}

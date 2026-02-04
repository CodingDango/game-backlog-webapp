import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Page } from "@/types/types";

interface PaginationParams {
  previousLink?: string;
  nextLink?: string;
  pages?: Page[];
  activePageNumber?: number;
  showEndEllipsis?: boolean;
}

export default function AppPagination({
  previousLink,
  nextLink,
  pages = [],
  activePageNumber = 1,
  showEndEllipsis = false,
}: PaginationParams) {
  return (
    <Pagination>
      <PaginationContent>
        {previousLink && (
          <PaginationItem>
            <PaginationPrevious href={previousLink} />
          </PaginationItem>
        )}

        {pages.map(({ link, pageNumber }) => (
          <PaginationItem key={`page-${pageNumber}`}>
            <PaginationLink
              isActive={activePageNumber == pageNumber}
              href={link}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEndEllipsis && <PaginationEllipsis />}

        {nextLink && (
          <PaginationItem>
            <PaginationNext href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

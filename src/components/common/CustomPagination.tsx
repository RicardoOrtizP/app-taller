import { Pagination } from "@heroui/react";
const linkClass = "text-muted hover:bg-surface hover:text-foreground";
const activeClass = `bg-accent text-accent-foreground hover:bg-accent-hover`;
export interface PaginationProps {
  pages: number;
  page: number;
  setPage: (page: number) => void;
}
export const CustomPagination = ({ pages, page, setPage }: PaginationProps) => {
  const currentPage = Math.min(Math.max(page, 1), Math.max(pages, 1));
  const handlePrevious = () => {
    setPage(Math.max(1, currentPage - 1));
  };
  const handleNext = () => {
    setPage(Math.min(pages, currentPage + 1));
  };
  if (pages <= 0) {
    return null;
  }

  return (
    <Pagination className="justify-center">
      <Pagination.Content className="gap-1 rounded-xl bg-default-p-1">
        <Pagination.Item>
          <Pagination.Previous
            className={linkClass}
            isDisabled={currentPage <= 1}
            onPress={handlePrevious}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p: number) => (
          <Pagination.Item key={p}>
            <Pagination.Link
              className={p === currentPage ? activeClass : linkClass}
              isActive={p === currentPage}
              onPress={() => setPage(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            className={linkClass}
            isDisabled={currentPage >= pages}
            onPress={handleNext}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
};

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const renderPageButtons = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => createPageUrl(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            i === currentPage
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
          }`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full mt-12">
      {/* Prev Button */}
      <div className="flex-1 flex justify-start">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            hasPrev
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasPrev}
          onClick={() => createPageUrl(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>
      </div>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-2">
        {renderPageButtons()}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            hasNext
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasNext}
          onClick={() => createPageUrl(currentPage + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

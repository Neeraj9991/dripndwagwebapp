"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
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

  return (
    <div className="flex items-center justify-between w-full mt-12">
      <div className="flex-1 flex justify-start">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            hasPrev
              ? "bg-lama text-white hover:bg-lama-dark"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasPrev}
          onClick={() => createPageUrl(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        {currentPage > 2 && (
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => createPageUrl(1)}
          >
            1
          </button>
        )}
        {currentPage > 3 && <span className="px-1">...</span>}
        {hasPrev && (
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => createPageUrl(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          className="px-3 py-1 rounded-md bg-lama text-white text-sm font-medium"
          aria-current="page"
        >
          {currentPage}
        </button>
        {hasNext && (
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => createPageUrl(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < 3 && (
          <button
            className="px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => createPageUrl(3)}
          >
            3
          </button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            hasNext
              ? "bg-lama text-white hover:bg-lama-dark"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasNext}
          onClick={() => createPageUrl(currentPage + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

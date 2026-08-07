"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowLeftDoubleIcon,
  ArrowRight02Icon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons";
import type React from "react";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationTableProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export default function PaginationTable({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationTableProps): React.ReactElement {
  const id = useId();

  const pageSizeOptions = [10, 25, 50, 100];
  if (!pageSizeOptions.includes(pageSize)) {
    pageSizeOptions.push(pageSize);
    pageSizeOptions.sort((a, b) => a - b);
  }

  const handlePageSizeChange = (value: string | null) => {
    if (!value) return;
    onPageSizeChange(Number(value));
    onPageChange(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && totalPages > 1) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <Label htmlFor={id}>Lignes par page</Label>
        <Select
          items={pageSizeOptions.map((size) => ({
            label: String(size),
            value: String(size),
          }))}
          value={String(pageSize)}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger id={id} className="w-fit whitespace-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>

      <div className="flex grow justify-end whitespace-nowrap text-muted-foreground text-sm">
        <p aria-live="polite">
          <span className="text-foreground">
            {startItem}-{endItem}
          </span>{" "}
          sur <span className="text-foreground">{totalItems}</span>
        </p>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer"
                onClick={() => handlePageChange(1)}
                aria-label="Première page"
                aria-disabled={
                  currentPage === 1 || totalPages <= 1 ? true : undefined
                }
              >
                <HugeiconsIcon
                  icon={ArrowLeftDoubleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Page précédente"
                aria-disabled={
                  currentPage === 1 || totalPages <= 1 ? true : undefined
                }
              >
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Page suivante"
                aria-disabled={
                  currentPage === totalPages || totalPages <= 1
                    ? true
                    : undefined
                }
              >
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer"
                onClick={() => handlePageChange(totalPages)}
                aria-label="Dernière page"
                aria-disabled={
                  currentPage === totalPages || totalPages <= 1
                    ? true
                    : undefined
                }
              >
                <HugeiconsIcon
                  icon={ArrowRightDoubleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

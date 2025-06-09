// DataTable Component
"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
  tableMessage?: string;
  onPaginationChange?: (
    updater: ((old: PaginationState) => PaginationState) | PaginationState
  ) => void;
  onPageSizeChange?: (pageSize: number) => void;
  useFrontendPagination?: boolean; 
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  searchBy,
  tableMessage = "No results.",
  onPaginationChange,
  onPageSizeChange,
  useFrontendPagination = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSorting: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newValue =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;

    setSorting(newValue);

    // Only update URL if not using frontend pagination
    if (!useFrontendPagination) {
      const params = new URLSearchParams(searchParams);
      if (newValue.length > 0) {
        params.set("sort", newValue[0].id);
        params.set("order", newValue[0].desc ? "desc" : "asc");
      } else {
        params.delete("sort");
        params.delete("order");
      }
      params.delete("page");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSearch = useDebouncedCallback((term) => {
    // Only update URL if not using frontend pagination
    if (!useFrontendPagination) {
      const params = new URLSearchParams(searchParams);
      params.delete("page");
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  }, 300);

  const handlePaginationChange = (
    updater: ((old: PaginationState) => PaginationState) | PaginationState
  ) => {
    if (useFrontendPagination && onPaginationChange) {
      onPaginationChange(updater);
    } else {
      // Default URL-based pagination logic
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      const params = new URLSearchParams(searchParams);
      params.set("page", (newState.pageIndex + 1).toString());
      if (newState.pageSize !== pageSize) {
        params.set("size", newState.pageSize.toString());
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (useFrontendPagination && onPageSizeChange) {
      onPageSizeChange(newPageSize);
    } else {
      // Default URL-based pagination logic
      const params = new URLSearchParams(searchParams);
      params.set("size", newPageSize.toString());
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: handleSorting,
    onPaginationChange: handlePaginationChange,
    manualSorting: !useFrontendPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {searchBy && (
          <Input
            placeholder={`Search by ${searchBy}`}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {tableMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pathname={pathname}
        searchParams={searchParams}
        replace={replace}
        onPaginationChange={handlePaginationChange}
        onPageSizeChange={handlePageSizeChange}
        useFrontendPagination={useFrontendPagination}
      />
    </div>
  );
}

// DataTablePagination Component
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  enableSelect?: boolean;
  pathname: string;
  searchParams: URLSearchParams;
  replace: (url: string) => void;
  onPaginationChange?: (
    updater: ((old: PaginationState) => PaginationState) | PaginationState
  ) => void;
  onPageSizeChange?: (pageSize: number) => void;
  useFrontendPagination?: boolean;
}

export function DataTablePagination({
  pageCount,
  pageIndex,
  pageSize,
  enableSelect = false,
  pathname,
  searchParams,
  replace,
  onPaginationChange,
  onPageSizeChange,
  useFrontendPagination = false,
}: DataTablePaginationProps) {
  const handlePageChange = (page: number) => {
    if (useFrontendPagination && onPaginationChange) {
      onPaginationChange({
        pageIndex: page - 1, // Convert to 0-based index
        pageSize,
      });
    } else {
      // Default URL-based pagination
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (useFrontendPagination && onPageSizeChange) {
      onPageSizeChange(size);
    } else {
      // Default URL-based pagination
      const params = new URLSearchParams(searchParams);
      params.set("size", size.toString());
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  // Calculate display values
  const currentPage = useFrontendPagination ? pageIndex + 1 : pageIndex; // Adjust for display
  const totalPages = pageCount;

  return (
    <div
      className={`flex items-center ${
        enableSelect ? "justify-between" : "justify-center"
      } px-2 py-4`}
    >
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

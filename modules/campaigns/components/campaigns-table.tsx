"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Filter,
  Instagram,
  Plus,
  Search,
} from "lucide-react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  Campaign,
  CampaignStatus,
  Platform,
} from "@/modules/campaigns/contracts";
import { useCampaignFiltersStore } from "@/modules/campaigns/state/use-campaign-filters-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

function PlatformIcon({ platform }: { platform: Platform }) {
  return (
    <span title={platform} aria-label={platform}>
      {platform === "Instagram" ? (
        <Instagram className="size-3.5 text-pink-500" />
      ) : null}
      {platform === "TikTok" ? (
        <svg
          className="size-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.84a8.2 8.2 0 004.79 1.53V6.92a4.85 4.85 0 01-1.02-.23z" />
        </svg>
      ) : null}
      {platform === "Facebook" ? (
        <svg
          className="size-3.5 text-blue-600"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ) : null}
      {platform === "Shorts" ? (
        <svg
          className="size-3.5 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
        </svg>
      ) : null}
    </span>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const variants: Record<CampaignStatus, string> = {
    Draft: "border text-muted-foreground bg-transparent",
    Live: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
    Paused: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-900",
    Ended: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400 border-pink-200 dark:border-pink-900",
  };

  return (
    <Badge
      variant="outline"
      className={cn("px-2 py-0.5 text-xs font-medium", variants[status])}
    >
      {status}
    </Badge>
  );
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CampaignsTable({ campaigns }: { campaigns: Campaign[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const {
    searchQuery,
    statusFilter,
    platformFilter,
    setSearchQuery,
    setStatusFilter,
    setPlatformFilter,
  } = useCampaignFiltersStore();

  const columns = useMemo<ColumnDef<Campaign>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="h-auto p-0 text-xs font-medium hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Campanha <ChevronsUpDown className="ml-1 size-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex min-w-[160px] items-center gap-2">
            <Avatar className="size-6 shrink-0">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/glass/svg?seed=${row.original.avatarSeed}`}
              />
              <AvatarFallback className="text-xs">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {row.original.name}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="h-auto p-0 text-xs font-medium hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status <ChevronsUpDown className="ml-1 size-3" />
          </Button>
        ),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "platforms",
        header: "Plataformas",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {row.original.platforms.map((platform) => (
              <PlatformIcon key={platform} platform={platform} />
            ))}
          </div>
        ),
      },
      {
        accessorKey: "payRate",
        header: "Pay rate",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {row.original.payRate}
          </span>
        ),
      },
      {
        accessorKey: "creators",
        header: "Creators",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.creators || "—"}
          </span>
        ),
      },
      {
        accessorKey: "submissions",
        header: "Submissions",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.submissions || "—"}
          </span>
        ),
      },
      {
        accessorKey: "paid",
        header: "Paid",
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.paid ? formatUsd(row.original.paid) : formatUsd(0)}
          </span>
        ),
      },
      {
        accessorKey: "percentage",
        header: "Entrega",
        cell: ({ row }) => (
          <div className="flex min-w-[80px] items-center gap-2">
            <Progress value={row.original.percentage} className="h-1.5 flex-1" />
          </div>
        ),
      },
      {
        accessorKey: "budget",
        header: "Budget",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.budget ? formatUsd(row.original.budget) : formatUsd(0)}
          </span>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let result = campaigns;

    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      result = result.filter((campaign) =>
        campaign.name.toLowerCase().includes(normalizedQuery)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((campaign) => campaign.status === statusFilter);
    }

    if (platformFilter !== "all") {
      result = result.filter((campaign) =>
        campaign.platforms.includes(platformFilter)
      );
    }

    return result;
  }, [campaigns, platformFilter, searchQuery, statusFilter]);

  // TanStack Table expõe funções não compatíveis com memoização do React Compiler.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const hasActiveFilters = statusFilter !== "all" || platformFilter !== "all";
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = filteredData.length;
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex flex-col rounded-lg border bg-card">
      <div className="flex flex-col items-start gap-3 border-b p-4 sm:flex-row sm:items-center">
        <div className="relative w-full flex-1 sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar campanhas..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-8 pl-9 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Filter className="size-3" />
                Status
                {hasActiveFilters ? (
                  <span className="size-1.5 rounded-full bg-primary" />
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuCheckboxItem
                checked={statusFilter === "all"}
                onCheckedChange={() => setStatusFilter("all")}
              >
                Todos os status
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "Draft"}
                onCheckedChange={() => setStatusFilter("Draft")}
              >
                Draft
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "Live"}
                onCheckedChange={() => setStatusFilter("Live")}
              >
                Live
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "Paused"}
                onCheckedChange={() => setStatusFilter("Paused")}
              >
                Paused
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "Ended"}
                onCheckedChange={() => setStatusFilter("Ended")}
              >
                Ended
              </DropdownMenuCheckboxItem>
              {statusFilter !== "all" ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    Limpar filtro
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Filter className="size-3" />
                Plataforma
                {platformFilter !== "all" ? (
                  <span className="size-1.5 rounded-full bg-primary" />
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuCheckboxItem
                checked={platformFilter === "all"}
                onCheckedChange={() => setPlatformFilter("all")}
              >
                Todas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={platformFilter === "Instagram"}
                onCheckedChange={() => setPlatformFilter("Instagram")}
              >
                Instagram
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={platformFilter === "TikTok"}
                onCheckedChange={() => setPlatformFilter("TikTok")}
              >
                TikTok
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={platformFilter === "Facebook"}
                onCheckedChange={() => setPlatformFilter("Facebook")}
              >
                Facebook
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={platformFilter === "Shorts"}
                onCheckedChange={() => setPlatformFilter("Shorts")}
              >
                Shorts
              </DropdownMenuCheckboxItem>
              {platformFilter !== "all" ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPlatformFilter("all")}>
                    Limpar filtro
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button size="sm" className="ml-auto h-8 gap-1.5">
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">Nova campanha</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 whitespace-nowrap text-xs font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma campanha encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t px-4 py-3 sm:flex-row">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {totalRows === 0
              ? "0 campanhas"
              : `Mostrando ${from} a ${to} de ${totalRows} campanhas`}
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Linhas por pagina</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="px-2 text-sm tabular-nums">
            {pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Pagination, Spinner, Table, type SortDescriptor } from "@heroui/react";
import { CustomPagination } from "./CustomPagination";

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  width?: string | number;
  cellRender?: (item: T) => React.ReactNode;
}

export interface CustomTableProps<T = any> {
  columns: Column<T>[];
  items: T[];
  totalCount?: number;
  page?: number;
  pageSize?: number;
  isLoading?: boolean;
  sortDescriptor?: SortDescriptor;
  onPageChange?: (page: number) => void;
  onSortChange?: (descriptor: SortDescriptor) => void;
  emptyContent?: string;
}

export default function CustomTable<
  T extends { id?: string | number; key?: string | number },
>({
  columns = [],
  items = [],
  totalCount = 0,
  page = 1,
  pageSize = 5,
  isLoading = false,
  sortDescriptor = { column: "id", direction: "ascending" },
  onPageChange,
  onSortChange,
  emptyContent = "No se encontraron registros",
}: CustomTableProps<T>) {
  const pages = Math.max(1, Math.ceil(totalCount / pageSize));

  const renderCell = React.useCallback((item: T, column?: Column<T>) => {
    if (column?.cellRender) {
      return column.cellRender(item);
    }
    // Accessor para propiedades simples
    return (item as any)[column?.key || ""];
  }, []);

  const handleSortClick = (colKey: string, sortable?: boolean) => {
    if (!sortable || !onSortChange) return;

    let newDirection: SortDescriptor["direction"] = "ascending";
    if (
      sortDescriptor.column === colKey &&
      sortDescriptor.direction === "ascending"
    ) {
      newDirection = "descending";
    }

    onSortChange({ column: colKey, direction: newDirection });
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center justify-center";
      case "end":
        return "text-right justify-end";
      default:
        return "text-left justify-start";
    }
  };

  const handlePageChange = (pag: number) => {
    console.log(`Cambio a la pagina ${pag}`);
    if (onPageChange) {
      onPageChange(pag);
    }
  };
  return (
    <div className="w-full space-y-4">
      {/* Estructura base de HeroUI */}
      <Table className={`relative w-full`}>
        <Table.ScrollContainer>
          {/* Overlay de carga */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] z-30 flex items-center justify-center">
              <Spinner color="success" />
              <span className="text-sm text-muted">Cargando datos...</span>
            </div>
          )}
          <Table.Content
            aria-label="Tabla de datos genérica"
            className="w-full"
          >
            {/* Encabezados */}
            <Table.Header>
              {columns.map((col, index) => {
                const isSorted = sortDescriptor.column === col.key;
                return (
                  <Table.Column
                    key={col.key}
                    isRowHeader={index === 0}
                    style={{ width: col.width }}
                    onClick={() => handleSortClick(col.key, col.sortable)}
                    className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${col.sortable ? "cursor-pointer select-none hover:text-slate-900 dark:hover:text-white" : ""}`}
                  >
                    <div
                      className={`flex items-center gap-2 ${getAlignClass(col.align)}`}
                    >
                      <span>{col.label}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDescriptor.direction === "ascending" ? (
                              "▲"
                            ) : (
                              "▼"
                            )
                          ) : (
                            <span className="opacity-30">↕</span>
                          )}
                        </span>
                      )}
                    </div>
                  </Table.Column>
                );
              })}
            </Table.Header>
            {/* Cuerpo de la tabla */}
            <Table.Body>
              {items.length > 0 ? (
                items.map((item, rowIndex) => {
                  const rowId = item.id || item.key || rowIndex;
                  return (
                    <Table.Row key={rowId} id={rowId}>
                      {columns.map((col) => (
                        <Table.Cell
                          key={col.key}
                          className={`px-4 text-sm text-slate-700 dark:text-slate-200 ${getAlignClass(col.align)}`}
                        >
                          {col.cellRender
                            ? col.cellRender(item)
                            : (item as any)[col.key]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row id="empty-row">
                  <Table.Cell
                    colSpan={columns.length}
                    className={`px-4 py-12 text-center text-slate-400 dark:text-slate-500`}
                  >
                    {emptyContent}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
      {/* Paginacion */}
      {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2 text-xs text-slate-500 dark:text-slate-400">
          <CustomPagination
            pages={pages}
            page={page}
            setPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

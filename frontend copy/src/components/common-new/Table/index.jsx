import { useEffect, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import SortIcon from "../../../assets/icons/sortIcon.svg";
import GlobalFilter from "../GlobalFilter";
import { Pagination } from "../Pagination";
import TableColumnFilter from "../TableColumnFilter";
import { FilterTab } from "../FilterTab";
import { Button } from "../Button";

import {
  Table as TableContainer,
  TableBody,
  TableHead,
  TableHeader,
} from "./styles";

export const Table = ({
  columns,
  data,
  filters = [],
  isSortedBy,
  isWithoutHeader,
  isWithoutPagination,
  itemName,
  maxWidth,
  buttonLabel,
  onButtonClick,
  buttonIcon,
  filterTabs = [],
  hiddenColumns = [],
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    nextPage,
    previousPage,
    setPageSize,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
    setColumnFilters,
    getPrePaginationRowModel,
    setColumnVisibility
  } = table;

  const { pageIndex, pageSize } = getState().pagination;

  const appliedFilters = useRef([]);

  useEffect(() => {
    appliedFilters.current = getState().columnFilters;

    if (appliedFilters?.current?.length) {
      setColumnFilters(appliedFilters.current);
    } else {
      filters.forEach((filter) => {
        if (!filter.isFilteredManually) {
          setColumnFilters((prev) => [
            ...prev,
            { id: filter.column, value: filter.defaultValue },
          ]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    hiddenColumns?.forEach((hiddenColumn) => {
      setColumnVisibility(hiddenColumn, true)
    })
  }, [hiddenColumns, setColumnVisibility])

  useEffect(() => {
    const element = document.querySelector("body");
    element?.scrollIntoView({ behavior: "smooth" });
  }, [pageIndex]);

  return (
    <>
      {!isWithoutHeader && (
        <TableHeader>
          <div className="item-container">
            {!filterTabs?.length ? (
              <h5 className="item-count mb-0">
                {`${getPrePaginationRowModel().rows.length} ${itemName}`}
              </h5>
            ) : null}
            {filterTabs.map((filter) => (
              <div className="filter-tab" key={filter.column}>
                <FilterTab
                  column={filter.column}
                  itemName={filter.itemName}
                  onChange={(val) => {
                    setColumnFilters((prev) =>
                      prev.map((f) =>
                        f.id === filter.column ? { ...f, value: val } : f
                      )
                    );
                  }}
                  value={
                    getState().columnFilters.find((f) => f.id === filter.column)
                      ?.value || ""
                  }
                />
              </div>
            ))}
          </div>

          <div className="filters">
            <div className="filter-container">
              {filters.map((filter) => (
                <div className="filter" key={filter.column}>
                  <TableColumnFilter
                    pageIndex={pageIndex}
                    gotoPage={(index) =>
                      setPagination((p) => ({ ...p, pageIndex: index }))
                    }
                    column={filter.column}
                    data={filter.data}
                    defaultValue={filter.defaultValue}
                    formatOptionLabel={filter.formatOptionLabel}
                    itemName={filter.itemName}
                    onChange={(column, value) => {
                      if (!filter.isFilteredManually) {
                        setColumnFilters((prev) => [
                          ...prev.filter((f) => f.id !== column),
                          { id: column, value },
                        ]);
                      }
                      if (filter.onChange) filter.onChange(value);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="search">
              <GlobalFilter
                pageIndex={pageIndex}
                gotoPage={(index) =>
                  setPagination((p) => ({ ...p, pageIndex: index }))
                }
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
            {buttonLabel && onButtonClick && (
              <div className="button-container">
                <Button
                  icon={buttonIcon || ""}
                  className="add-button"
                  isFullWidth={false}
                  onClick={onButtonClick}
                  label={buttonLabel}
                />
              </div>
            )}
          </div>
        </TableHeader>
      )}

      <TableContainer maxWidth={maxWidth}>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header?.id}>
                  <div className="align-items-center d-flex">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortedBy && (
                      <img className="sort-icon" src={SortIcon} alt="sort" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-label={cell.column.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </TableBody>
      </TableContainer>

      {!isWithoutPagination && (
        <Pagination
          canNextPage={getCanNextPage()}
          canPreviousPage={getCanPreviousPage()}
          gotoPage={(index) =>
            setPagination((prev) => ({ ...prev, pageIndex: index }))
          }
          nextPage={nextPage}
          pageCount={getPageCount()}
          pageIndex={pageIndex}
          pageOptions={table.getPageOptions()}
          pageSize={pageSize}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
};

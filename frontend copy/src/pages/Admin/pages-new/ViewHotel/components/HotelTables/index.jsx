/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import moment from "moment";

import { EmptyState, Table } from "../../../../../../components/common";

// import { TableCellLink } from "../../../../../../components/common/Table/styles"
import { ListingPageHeader, TableSpinner } from "../../../../components-new";
import { HotelTableContainer } from "./elements";

export const HotelTables = ({ hotelTables, isListLoading, hotelId }) => {
  const history = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessorKey: "serial",
        className: "serial",
        id: 'serial',
      },
      {
        Header: "Table Name",
        accessorKey: "table_name",
        className: "table-name",
        id: 'table_name',
      },
      {
        Header: "Seat Count",
        Cell: ({ value }) => (
          <div className="d-flex align-items-center">
            <div className="counts-present">{value}</div>
          </div>
        ),
        accessorKey: "table_seat_count",
        className: "seat-count",
        id: 'table_seat_count',
      },

      {
        Header: "Table Created At",
        Cell: ({ value }) => (
          <div className="total-count">
            {moment(value).format("DD MMM YYYY")}
          </div>
        ),
        accessorKey: "table_created_at",
        className: "table-creation",
        id: "table_created_at",
      },
    ],
    []
  );

  // Add a serial number to each row and memoize the data.
  const data = useMemo(
    () => [
      ...(hotelTables || []).map((item, index) => ({
        ...item,
        serial: index + 1,
      })),
    ],
    [hotelTables]
  );

  return (
    <>
      <HotelTableContainer>
        <ListingPageHeader
          className="add-booking mb-4"
          title="All Tables"
          buttonLabel="Add Booking"
          onButtonClick={() => {
            if (hotelTables.length) {
              history(`/customer/${hotelId}/book-table`, {
                replace: true,
              });
            }
          }}
        />

        <div className="table-container">
          {isListLoading ? <TableSpinner /> : null}
          {!isListLoading && !hotelTables?.length ? (
            <EmptyState
              description="try adjusting the search or filter for what you are looking for"
              title="No Table Found"
            />
          ) : null}

          {!isListLoading &&
          hotelTables?.length &&
          Array.isArray(hotelTables) &&
          !isListLoading ? (
            <Table
              columns={columns}
              data={data}
              itemName="Tables"
              maxWidth="75rem"
              isSortedBy
            />
          ) : null}
        </div>
      </HotelTableContainer>
    </>
  );
};

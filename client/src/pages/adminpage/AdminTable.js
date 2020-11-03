import React, { useState, useEffect } from 'react';

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  filterTypes,
  useFilters,
} from 'react-table';
import { Table } from 'react-bootstrap';
import { useMemo } from 'react';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, Header },
}) {
  if (Header === '#') return <div />;
  return (
    <input
      style={{
        width: '90%',
        fontSize: '15px',
        height: '20px',
      }}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${Header}`}
    />
  );
}

function OPTable({ data, columns, getCellProps, onClickHandler, adminId }) {
  const [adminIdNum, setadminIdNum] = useState([]);
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  useEffect(() => {
    setadminIdNum([...adminId]);
  }, [adminId]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  return (
    <div
      style={{
        overflow: 'auto',
        maxHeight: '74vh',
      }}
      className='mx-auto mt-3 text-center'
    >
      <Table
        {...getTableProps()}
        striped
        bordered
        hover
        style={
          {
            // tableLayout: 'fixed',
          }
        }
      >
        <thead style={{ height: 100 }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i}>
                  <h5 {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                    </span>
                  </h5>
                  <br />
                  <DefaultColumnFilter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === '#')
                    return <td key='random-key'>{i + 1}</td>;
                  else if (cell.column.Header === 'Action') {
                    return (
                      <td key='random-key2'>
                        {adminIdNum.includes(
                          cell.render('Cell').props.cell.value
                        ) ? (
                          <b>ADMIN PROFILE</b>
                        ) : (
                          <>
                            <select
                              style={{ width: '100%' }}
                              onChange={onClickHandler}
                              defaultValue='Choose an action'
                              {...cell.getCellProps([
                                { ...getCellProps(cell) },
                              ])}
                            >
                              <option disabled style={{ width: 'inherit' }}>
                                {' '}
                                Choose an action
                              </option>
                              <option value='0'>View Profile </option>
                              <option value='1'>Relieve Employee</option>
                              <option value='2'>Change to Active</option>
                              <option value='3'>Change to Inactive</option>
                              <option value='4'>Delete Employee</option>

                              <option
                                disabled
                                style={{ color: 'rgba(0,0,0,0)' }}
                              >
                                {cell.render('Cell').props.cell.value}
                              </option>
                            </select>
                          </>
                        )}
                      </td>
                    );
                  } else if (cell.column.Header === 'Name') {
                    return (
                      <td
                        {...cell.getCellProps([{ ...getCellProps(cell) }])}
                        style={{ color: '#0D054B', fontWeight: 700 }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  } else if (cell.column.Header === 'Status') {
                    return (
                      <td
                        {...cell.getCellProps([{ ...getCellProps(cell) }])}
                        style={
                          cell.render('Cell').props.cell.value[0] === 'I'
                            ? { color: 'red', fontWeight: 700 }
                            : cell.render('Cell').props.cell.value[0] === 'A'
                            ? { color: 'green', fontWeight: 700 }
                            : cell.render('Cell').props.cell.value[0] === 'R'
                            ? { fontWeight: 700 }
                            : {}
                        }
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps([{ ...getCellProps(cell) }])}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OPTable;

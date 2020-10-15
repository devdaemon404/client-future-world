import React from 'react';
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
        fontSize: '18px',
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

function OPTable({ data, columns, getCellProps, onClickHandler }) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

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
        maxHeight: '70vh',
      }}
      className='container mx-auto mt-3 text-center'
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
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i}>
                  <h5 {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                  </h5>
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                  </span>
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
                        <select
                          style={{ width: '100%' }}
                          onChange={onClickHandler}
                          defaultValue='Choose an action'
                          {...cell.getCellProps([{ ...getCellProps(cell) }])}
                        >
                          <option disabled style={{ width: 'inherit' }}>
                            {' '}
                            Choose an action
                          </option>
                          <option value='0'>Download</option>
                          <option value='1'>Relieve</option>
                          <option value='2'>Active</option>
                          <option disabled style={{ color: 'rgba(0,0,0,0)' }}>
                            {cell.render('Cell').props.cell.value}
                          </option>
                        </select>
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

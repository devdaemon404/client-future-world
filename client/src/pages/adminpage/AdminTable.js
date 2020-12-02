import React, { useState, useEffect } from 'react';

import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  filterTypes,
  useFilters,
} from 'react-table';
import { Button, Table } from 'react-bootstrap';
import { useMemo } from 'react';
import { Select, Input } from 'antd';
const { Option } = Select;

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, Header },
}) {
  if (Header === '#' || Header === 'Action') return <div />;
  return (
    <Input
      style={{
        fontSize: '12px',
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

function OPTable({
  data,
  columns,
  getCellProps,
  onClickHandler,
  onClickHandler2,
  adminId,
}) {
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
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },

    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn Option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div
      style={{
        overflow: 'auto',
        maxHeight: '80vh',
      }}
      className='mx-auto mt-3 text-center'>
      <div className='pagination' style={{ width: '100%' }}>
        <button
          className='pagination-button'
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button
          className='pagination-button'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button
          className='pagination-button'
          onClick={() => nextPage()}
          disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button
          className='pagination-button'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>{' '}
          | Go to page:
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
          <label>Rows per Page</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>{' '}
      </div>

      <Table
        className='table'
        {...getTableProps()}
        striped
        bordered
        hover
        style={
          {
            // tableLayout: 'fixed',
          }
        }>
        <thead className='tableHead'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i}>
                  <p
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ fontWeight: 700 }}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                    </span>
                  </p>
                  <br />
                  <DefaultColumnFilter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === '#')
                    return <td key='random-key'>{i + 1}</td>;
                  else if (cell.column.Header === 'View') {
                    return (
                      <Button
                        key='random-key3'
                        variant='link'
                        onClick={(e) => {
                          onClickHandler2(cell.render('Cell').props.cell.value);
                        }}>
                        View Job
                      </Button>
                    );
                  } else if (cell.column.Header === 'Action') {
                    return (
                      <td key='random-key2'>
                        {adminIdNum.includes(
                          cell.render('Cell').props.cell.value
                        ) ? (
                          <b>ADMIN PROFILE</b>
                        ) : (
                          <>
                            <Select
                              style={{ width: '100%' }}
                              // onChange={onClickHandler}
                              value={'Choose'}
                              onChange={(index) => {
                                onClickHandler(index.toString(), cell.value);
                              }}
                              defaultValue='Choose an action'
                              {...cell.getCellProps([
                                { ...getCellProps(cell) },
                              ])}>
                              <Option disabled style={{ width: 'inherit' }}>
                                {' '}
                                Choose an action
                              </Option>
                              <Option value='0'>View </Option>
                              <Option value='1'>Relieve </Option>
                              <Option value='2'> Active</Option>
                              <Option value='3'> Disable</Option>
                              <Option value='4'>Delete </Option>
                            </Select>
                          </>
                        )}
                      </td>
                    );
                  } else if (cell.column.Header === 'Name') {
                    return (
                      <td
                        {...cell.getCellProps([{ ...getCellProps(cell) }])}
                        style={{ color: '#0D054B', fontWeight: 700 }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  } else if (cell.column.Header === 'Status') {
                    return (
                      <td
                        {...cell.getCellProps([{ ...getCellProps(cell) }])}
                        style={
                          cell.render('Cell').props.cell.value[0] === 'D'
                            ? { color: '#c62828', fontWeight: 700 }
                            : cell.render('Cell').props.cell.value[0] === 'A'
                            ? { color: '#558B2F', fontWeight: 700 }
                            : cell.render('Cell').props.cell.value[0] === 'R'
                            ? { fontWeight: 700 }
                            : {}
                        }>
                        {cell.render('Cell').props.cell.value.split('-')[0]}
                        <br />
                        {cell.render('Cell').props.cell.value.split('-')[1]}
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

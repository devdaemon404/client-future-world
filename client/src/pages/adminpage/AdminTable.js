import React, { useState, useEffect } from 'react';

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  filterTypes,
  useFilters,
} from 'react-table';
import { Table } from 'react-bootstrap';
import { Select, Input } from 'antd';
import { useMemo } from 'react';

const { Option } = Select;

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, Header },
}) {
  if (Header === '#') return <div />;
  return (
    <Input
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
      defaultColumn, // Be sure to pass the defaultColumn Option
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
                  <p {...column.getHeaderProps(column.getSortByToggleProps())} style={{ fontSize: 17, fontWeight: 700 }} >
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
                              <Select
                                style={{ width: '100%' }}
                                // onChange={onClickHandler}
                                value={'Choose'}
                                onChange={
                                  (index) => {
                                    onClickHandler(index.toString(), cell.value)
                                  }
                                }
                                defaultValue='Choose an action'
                                {...cell.getCellProps([
                                  { ...getCellProps(cell) },
                                ])}
                              >
                                <Option disabled style={{ width: 'inherit' }}>
                                  {' '}
                                Choose an action
                              </Option>
                                <Option value='0'>View Profile </Option>
                                <Option value='1'>Relieve Employee</Option>
                                <Option value='2'>Change to Active</Option>
                                <Option value='3'>Change to Inactive</Option>
                                <Option value='4'>Delete Employee</Option>
                              </Select>
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
                            ? { color: '#c62828', fontWeight: 700 }
                            : cell.render('Cell').props.cell.value[0] === 'A'
                              ? { color: '#558B2F', fontWeight: 700 }
                              : cell.render('Cell').props.cell.value[0] === 'R'
                                ? { fontWeight: 700 }
                                : {}
                        }
                      >
                        {cell.render('Cell').props.cell.value.split('-')[0]}<br />{cell.render('Cell').props.cell.value.split('-')[1]}
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

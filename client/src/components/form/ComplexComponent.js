import React, { useMemo, useState } from 'react';

/**
 *
 * @param {{defaultData: Object, essentialFieldKeys: Object, tableColumns: Array<String>, textFieldDetails: Object, buttonName: String, onSubmit: Function}} param0
 * Creates a component to show a button and dynamic textfields based on the given data
 *
 */
function ComplexComponent({
  defaultData = [],
  essentialFieldKeys,
  tableColumns,
  textFieldDetails,
  buttonName = 'Invalid Button Name',
  onSubmit = (_) => {},
}) {
  const [data, setData] = useState([...defaultData]);
  const tempInfoArr = [];
  useMemo(() => {
    setData([...defaultData]);
  }, [defaultData]);
  data.forEach((d) => {
    const dataArray = essentialFieldKeys.map((k) => d[k]);
    tempInfoArr.push(dataArray);
  });
  const [isInserting, setIsInserting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFieldIndex, setEditingFieldIndex] = useState(0);

  /**
   *
   * Toggle whether the fields is editing
   *
   */
  const toggleFields = () => {
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    if (isInserting) {
      setIsInserting(false);
      return;
    }
    setIsInserting(true);
  };

  /**
   *
   * @param {Array<Object>} data
   *
   * Takes in an array of objects and make sets it as the state
   * Also calls on onSubmit prop, to make API requests and save tha state of the application
   *
   */
  const saveData = (data) => {
    onSubmit(data);
    setData(data);
  };

  /**
   *
   * @param {Number} index
   *
   * Takes in the index of the element to be deleted
   * Saves the state after deletion
   *
   */
  const onDelete = (index) => {
    const tempData = data.filter((d, i) => i !== index);
    saveData([...tempData]);
  };

  /**
   *
   * @param {Event} e
   *
   * Handled new information
   * Takes in a DOM Event for a form and extracts the key/value pairs
   * to insert it into the state
   *
   */
  const handleNewDataSubmit = (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    const formDataMap = {};
    for (let [key, value] of formData.entries()) {
      formDataMap[key] = value;
    }
    const tempArr = [...data, formDataMap];
    saveData([...tempArr]);
    toggleFields();
    setIsEditing(false);
  };

  /**
   *
   * @param {Event} e
   *
   * Handled editted information
   * Takes in a DOM Event for a form and extracts the key/value pairs
   * to insert it into the state
   *
   */
  const handleEditDataSubmit = (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    const formDataMap = {};
    for (let [key, value] of formData.entries()) {
      formDataMap[key] = value;
    }
    data[editingFieldIndex] = formDataMap;
    saveData([...data]);
    setIsEditing(false);
  };

  return (
    <div className=''>
      {/* 
        Main button on the top of the component 
        --------------------------BUTTON------------------------
      */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className='btn active crumb-item selected-crumb'
            onClick={toggleFields}
          >
            <span style={{ fontSize: 20 }}>
              {isEditing || isInserting ? (
                <div>
                  <i class='fas fa-chevron-circle-left'></i> &nbsp; Go Back
                </div>
              ) : (
                buttonName
              )}
            </span>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------ */}
      {/* 
        Check if the state is in Editing or Insert mode 
        ---------------INSERT MODE FIELDS---------------------------
      */}
      {isInserting ? (
        <div>
          <div className='container-fluid p-2' />
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleNewDataSubmit}
          >
            {textFieldDetails.map((details) => (
              <OPTextField
                label={details.label}
                name={details.key}
                key={details.key}
                isRequired={details.isRequired}
                type={details.type}
              />
            ))}
            {/* <input type='submit' /> */}
            <button
              type='submit'
              className='btn btn-primary w-100 font-weight-bold mb-5 mt-4'
            >
              <i className='far fa-check-circle'></i> Save and Continue
            </button>
          </form>
          {/* ------------------------------------------------------ */}
        </div>
      ) : isEditing ? (
        <div>
          {/* 
          ---------------EDIT MODE FIELDS---------------------------
           */}
          <div className='container-fluid p-2' />
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleEditDataSubmit}
          >
            {textFieldDetails.map((details) => (
              <OPTextField
                label={details.label}
                name={details.key}
                key={details.key}
                isRequired={details.isRequired}
                defaultValue={data[editingFieldIndex][details.key]}
                type={details.type}
              />
            ))}
            <button
              type='submit'
              className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
            >
              <i className='far fa-check-circle'></i> Save and Continue
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* 
          ---------------Information Table---------------------------
           */}
          <div className='container-fluid p-2' />
          <InfoTable />
        </div>
      )}
    </div>
  );

  /**
   * Information Table Component, to display the table
   */
  function InfoTable() {
    return (
      <div className=''>
        <p>
          <span>({buttonName}&nbsp; to show below)</span>
        </p>
        <table
          className='table table-striped  table-borderless mt-4 mb-5'
          style={{
            display: 'block',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <thead>
            <tr>
              {tableColumns.map((colName, key) => (
                <th key={key}>{colName}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((infoRow, key) => (
              <tr key={key}>
                {essentialFieldKeys.map((essentialKey, key) => (
                  <td key={key}>{infoRow[essentialKey]}</td>
                ))}
                <td>
                  <button
                    className='btn selected-crumb crumb-item mx-1 my-1'
                    onClick={() => {
                      setEditingFieldIndex(key);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='btn crumb-item mx-1 my-1'
                    onClick={() => onDelete(key)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  /**
   *
   * @param {{label: String, name: String, isRequired: Boolean, defaultValue: String}} param0
   * Takes in props to display the Text Fields in the form
   */
  function OPTextField({
    label,
    name,
    isRequired = false,
    defaultValue = '',
    type,
  }) {
    return (
      <div
        // style={{
        //   marginBottom: 10,
        //   display: 'grid',
        //   gridTemplateColumns: '1fr 4fr',
        // }}
        className='p-3'
      >
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          class='form-control'
          required={isRequired}
          defaultValue={defaultValue}
          type={type}
        />
      </div>
    );
  }
}

export default ComplexComponent;

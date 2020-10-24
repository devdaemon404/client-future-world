import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <div
        style={{
          width: 610,
        }}
      >
        <Button
          variant='primary'
          onClick={handleShow}
          className='submit-button w-100 font-weight-bold'
          style={{ backgroundColor: '#296284', border: 'none' }}
        >
          Submit Application
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to submit application?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='primary'
            onClick={handleClose}
            className='font-weight-bold'
            style={{ backgroundColor: '#296284', border: 'none' }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;

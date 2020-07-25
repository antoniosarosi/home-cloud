import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CloudArrowUpFill } from 'react-bootstrap-icons';
import FilesForm from './FilesForm';

const UploadModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const iconStyle = { color: '#FFF', size: 24, className: 'ml-2' };

  return (
    <>
      <Button variant="primary" size="lg" block onClick={handleShow}>
        Upload Files
        <CloudArrowUpFill {...iconStyle} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilesForm uploadTo={props.uploadTo} reload={props.reload}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadModal;

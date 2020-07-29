import React from 'react';
import BpAlert from 'react-bootstrap/Alert';

const Alert = (props) => (
  <BpAlert
    variant={props.alert.success ? 'success' : 'danger'}
    onClose={props.onClose}
    dismissible
  >
    {props.alert.message}
  </BpAlert>
);

export default Alert;

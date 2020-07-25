import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PathForm = () => (
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Path</Form.Label>
      <Form.Control type="text" placeholder="Path" className="mb-2" />
      <Button variant="primary" type="submit">
        Jump
      </Button>
    </Form.Group>
  </Form>
);

export default PathForm;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const Loading = (props) => (
  <Container className="text-center mx-auto">
    <h5>{props.title}</h5>
    <Spinner animation="border" variant="primary" className="mx-auto">
      <span className="sr-only">{props.text}</span>
    </Spinner>
  </Container>
);

export default Loading;

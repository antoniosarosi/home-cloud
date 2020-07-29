import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../api/api';

class MkDirForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.mkDir(this.props.path || '', this.state.name);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Form onSubmit={(e) => this.onSubmit(e)}>
        <Form.Group controlId="mkdir">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            className="mb-2"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.onChange(e)}
          />
          <Button size="lg" variant="success" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default MkDirForm;

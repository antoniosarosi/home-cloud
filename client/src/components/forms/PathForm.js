import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PathForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.processPath(this.props.path);
  }

  processPath(path) {
    const normalPath = path ? path.replace(/--/g, '/') : '';
    const apiPath = path ? path.replace(/\//g, '--') : '';

    return { normalPath, apiPath };
  }

  onChange(e) {
    this.setState(this.processPath(e.target.value));
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Path</Form.Label>
          <Form.Control
            type="text"
            className="mb-2"
            value={this.state.normalPath}
            onChange={(e) => this.onChange(e)}
          />
          <Link to={`/content/${this.state.apiPath}`}>
            <Button size="lg" variant="primary" type="submit">
              Jump
            </Button>
          </Link>
        </Form.Group>
      </Form>
    );
  }
}

export default PathForm;

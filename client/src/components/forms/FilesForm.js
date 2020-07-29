import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Loading from '../Loading';
import api from '../../api/api';

class FilesForm extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], uploading: false, showAlert: false, alert: {} };
  }

  onChange(e) {
    this.setState({ files: e.target.files });
  }

  showAlert(alert) {
    if (this.state.showAlert) {
      return (
        <Alert
          variant={alert.success ? 'success' : 'danger'}
          onClose={() => this.setState({ showAlert: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      );
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ uploading: true });
    try {
      const data = new FormData();
      for (const file of this.state.files) {
        data.append('file', file);
      }
      const res = await api.uploadFiles(this.props.uploadTo || '', data);
      this.setState({ uploading: false, alert: res, showAlert: true });
      this.props.reload();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.uploading) {
      return <Loading title="Uploading files..." text="Uploading" />;
    }
    return (
      <>
        {this.showAlert(this.state.alert)}
        <Form className="mb-3" onSubmit={(e) => this.onSubmit(e)}>
          <Form.Label>Upload File</Form.Label>
          <Form.File
            multiple
            className="mb-2"
            onChange={(e) => this.onChange(e)}
          />
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </>
    );
  }
}

export default FilesForm;

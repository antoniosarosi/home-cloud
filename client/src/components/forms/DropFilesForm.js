import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from '../Alert';
import api from '../../api/api';

class DropFilesForm extends Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false, showAlert: false, alert: {} };
  }

  preventAndStop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  showAlert(alert) {
    if (this.state.showAlert) {
      return (
        <Alert
          alert={alert}
          onClose={() => this.setState({ showAlert: false })}
        />
      );
    }
  }

  async onSubmit(e) {
    this.preventAndStop(e);
    if (!e.dataTransfer.files.length || this.state.uploading) {
      return
    };
    this.setState({ uploading: true });
    let response = {};

    try {
      const data = new FormData();
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        data.append('file', e.dataTransfer.files[i]);
      }
      response = await api.uploadFiles(this.props.uploadTo || '', data);
      this.props.reload();
    } catch (e) {
      response = e;
      console.log(e);
    }

    this.setState({ uploading: false, alert: response, showAlert: true });
  }

  render() {
    return (
      <>
        {this.showAlert(this.state.alert)}
        <Jumbotron style={{ border: '2px dashed #aaa' }} className="m-0 p-0">
          <p
            onDrop={(e) => this.onSubmit(e)}
            onDragEnter={(e) => this.preventAndStop(e)}
            onDragLeave={(e) => this.preventAndStop(e)}
            onDragOver={(e) => this.preventAndStop(e)}
            style={{
              color: '#777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
            }}
            className="m-0"
          >
            {this.state.uploading
              ? 'Uploading file(s)...'
              : 'Drop File(s) Here to Upload'}
          </p>
        </Jumbotron>
      </>
    );
  }
}

export default DropFilesForm;

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import UploadModal from './UploadModal';
import PathForm from './PathForm';
import Dirent from './Dirent';
import api from '../api/api';

class Dir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dir: {},
    };
  }

  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    try {
      const dir = await api.getContent(this.props.match.params.path || '');
      console.log(dir);
      this.setState({ loading: false, dir });
    } catch (e) {
      console.log(e);
    }
  }

  fillEntries() {
    if (this.state.loading) {
      return (
        <Spinner animation="border" variant="primary" className="mx-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    const content = this.state.dir.content;
    const path = this.props.match.params.path;

    const directories = [
      <Dirent
        name="Up a dir..."
        key="parent"
        isDirectory
        parentDirectory
        path={path}
      />,
    ];
    content.directories.forEach((dir) =>
      directories.push(<Dirent name={dir} isDirectory key={dir} path={path} />)
    );

    const files = content.files.map((file) => (
      <Dirent name={file} key={file} />
    ));

    return [...directories, ...files];
  }

  render() {
    const rowProps = { className: 'mx-auto' };
    const colProps = { className: 'm-2' };

    return (
      <Container>
        <Row {...rowProps}>
          <Col {...colProps}>
            <PathForm />
          </Col>
        </Row>
        <h1 className="text-center">Content</h1>
        <Row {...rowProps}>
          <Col {...colProps}>
            <UploadModal
              uploadTo={this.props.match.params.path}
              reload={() => this.loadContent()}
            />
          </Col>
        </Row>
        <Row {...rowProps}>{this.fillEntries()}</Row>
      </Container>
    );
  }
}

export default Dir;

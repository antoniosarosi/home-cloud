import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {
  FolderFill,
  FileEarmarkTextFill,
  Arrow90degUp
} from 'react-bootstrap-icons';

const DirCard = (props) => {
  const iconStyle = { color: '#61AFEF', size: 24 };
  let icon = <FileEarmarkTextFill {...iconStyle} />;
  if (props.isDirectory) {
    icon = <FolderFill {...iconStyle} />;
  }
  if (props.parentDirectory) {
    icon = <Arrow90degUp {...iconStyle} />;
  }

  return (
    <Card style={{ width: '100%', height: '4rem' }}>
      <Card.Body>
        <Card.Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {icon} {props.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const DirLink = (props) => {
  if (!props.isDirectory) {
    return <>{props.children}</>;
  }

  let link = `/content/${props.name}`;
  if (props.path) {
    link = `${props.path}-${props.name}`;
  }
  if (props.parentDirectory) {
    link = link.split('-').slice(0, -2).join('-') || '/content/';
  }

  return (
    <Link to={link} style={{ textDecoration: 'none' }} className="text-light">
      {props.children}
    </Link>
  );
};

const Dirent = (props) => {
  if (!props.path && props.parentDirectory) {
    return <></>;
  }

  return (
    <Col lg={4} xl={3} className="m-2">
      <DirLink {...props}>
        <DirCard {...props} />
      </DirLink>
    </Col>
  );
};

export default Dirent;

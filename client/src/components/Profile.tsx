import React from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Col, Row } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Avatar from './Avatar';
import { selectProfile } from '../slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);

  const renderCard = () => {
    return (
      <Col>
      <Card style={{ width: '288px', margin: "10px" }}>
        <Avatar name={profile?.name ?? ''} />
        <Card.Body>
          <Card.Title>{ profile?.name }</Card.Title>
          <Card.Text>{ profile?.email }</Card.Text>
          <Card.Text>Role: { profile?.role }</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>English: { profile?.englishLevel }</ListGroup.Item>
        </ListGroup>
        <Card.Body>
           <Card.Link href="#">{ profile?.resumeLink }</Card.Link>
        </Card.Body>
      </Card>
      </Col>
    );
  };

  return (
    <div className='content'>
      <h2>
        Profile 
      </h2>
      <Row>
       {renderCard()} 
      </Row>
    </div>
  );
};

export default Profile;
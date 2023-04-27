import React, { useState } from 'react';
import { Modal, Button, FormControl, ListGroup, Badge } from 'react-bootstrap';
import { IUser } from '../globals';

interface UserModalProps {
  show: boolean;
  users: IUser[];
  onHide: () => void;
  onSelect: (userId: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({ show, users, onHide, onSelect }) => {
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select a User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ListGroup>
          {filteredUsers.map((user) => (
            <ListGroup.Item key={user._id} action onClick={() => onSelect(user._id)}>
              {user.name} { user.email }
              <Badge pill bg="secondary">
                {user.role}
              </Badge>
            </ListGroup.Item>              
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;

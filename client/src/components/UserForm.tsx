import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addUser, updateUser } from '../slices/usersSlice';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { Roles, IUserFormProps } from '../globals';
import { showAlert } from '../slices/alertSlice';

const UserForm: React.FC<IUserFormProps> = ({ show, user, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Roles>(Roles.user);
  const [englishLevel, setEnglishLevel] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  useEffect(function () {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setRole(Roles[user?.role?? 'user']);
    setEnglishLevel(user?.englishLevel ?? '');
    setResumeLink(user?.resumeLink ?? '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !role) {
      dispatch(showAlert({ message: 'Name, email, and role fields are required.', variant: 'danger'}));
      return;
    }

    const rawUser = {
      name,
      password,
      email,
      role,
      englishLevel,
      resumeLink,
    };

    try {
      await dispatch(user ? updateUser(Object.assign(rawUser, { _id: user._id })) : addUser(rawUser)).unwrap();
      onSuccess();
    } catch (error: any) {
     dispatch( showAlert({ message: error || 'Error creating user.', variant: "danger"}));
    }
  };

  return (
    <Modal show={show} onHide={() => onSuccess()}>
      
      <Modal.Header closeButton>
        <Modal.Title>{ user ? 'Edit' : 'Add New' } User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="4">
              Name:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="4">
              Email:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

        {!user && ( 
          <Form.Group as={Row} controlId="password">
            <Form.Label column sm="4">
              Password:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                placeholder="Password"
                value={email}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Col>
          </Form.Group> )}

          <Form.Group as={Row} controlId="role">
            <Form.Label column sm="4">
              Role:
            </Form.Label>
            <Col sm="8">
              <Form.Control as="select" value={role} onChange={(e) => setRole(Roles[e.target.value as Roles])} required>
                <option value={Roles.super_admin}>Super Admin</option>
                <option value={Roles.admin}>Admin</option>
                <option value={Roles.user}>User</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="englishLevel">
            <Form.Label column sm="4">
              English Level:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="English level"
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="resumeLink">
            <Form.Label column sm="4">
              Resume URL:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { updateAccount, addAccount } from '../slices/accountsSlice';
import { selectUsers } from '../slices/usersSlice';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { IAccountFormProps, IUser } from '../globals';
import { showAlert } from '../slices/alertSlice';
import Select from 'react-select'

const AccountForm: React.FC<IAccountFormProps> = ({ show, account, onSuccess }) => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);

  const [name, setName] = useState("");
  const [client, setClient] = useState('');
  const [responsible, setResponsible] = useState('');
  const [team, setTeam] = useState<IUser[]>(account?.team || []);

  useEffect(function () {
    setName(account?.name ?? '');
    setClient(account?.client ?? '');
    setResponsible(account?.responsible?._id ?? '');
    setTeam(account?.team || []);
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !client || !responsible) {
      dispatch(showAlert({ message: 'Name, Client, and Responsible fields are required.', variant: 'danger'}));
      return;
    }
    const rawAccount = { name, client, responsible, team: team.map(u => u._id) };

    try {
      await dispatch(account ? updateAccount(Object.assign(rawAccount, { _id: account._id })) : addAccount(rawAccount)).unwrap();
      onSuccess();
      resetForm();
    } catch (error: any) {
      console.error(error);
      dispatch( showAlert({ message:'Error creating account.', variant: "danger"}));
    }
  };

  const handleMultiSelect = (selectedUsers: any) => {
    let users = selectedUsers.map((user: { value: string; label: string }) => ({ _id: user.value, name: user.label }));
    setTeam(users);
  };

  const options = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const handleOnClose = () => {
    resetForm();
    onSuccess();
  };

  const resetForm = () => {
    setName('');
    setClient('');
    setResponsible('');
    setTeam([]);
  };

  return (
    <Modal show={show} onHide={ handleOnClose }>
      
      <Modal.Header closeButton>
        <Modal.Title>{ account ? 'Edit' : 'Add New' } Account</Modal.Title>
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

          <Form.Group as={Row} controlId="client">
            <Form.Label column sm="4">
              Client:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="responsible">
            <Form.Label column sm="4">
              Responsible:
            </Form.Label>
            <Col sm="8">
              <Form.Control as="select" value={responsible} onChange={(e) => setResponsible(e.target.value)} required>
                <option value="">Select a responsible</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="team">
            <Form.Label column sm="4">
              Team:
            </Form.Label>
            <Col sm="8">
             <Select 
              options={options} 
              isMulti 
              name="team" 
              value={team.map((user) => ({ value: user._id, label: user.name }))}
              onChange={handleMultiSelect}
              className="basic-multi-select" 
              classNamePrefix="select"/>
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

export default AccountForm;

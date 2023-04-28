import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { IAccount, IFilter, IUser } from '../globals';

interface FilterFormProps {
  users   : IUser[];
  accounts: IAccount[];
  onSubmit: (filter: IFilter) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ users, accounts, onSubmit }) => {
  const [userId, setUserId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ userId, accountId, startedAt, endedAt });
  };

  return (
    <Form onSubmit={handleSubmit} className='row gy-2 gx-3 align-items-center'>
      <div className="col-auto">
        <Form.Group as={Row} controlId="userId">
          <Col>
            <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>
              <option value="">User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </div>

      <div className="col-auto">
        <Form.Group as={Row} controlId="accountId">
          <Col>
            <Form.Select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              <option value="">Account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </div>

      <div className="col-auto">
        <Form.Group as={Row} controlId="startedAt">
          <Form.Label column sm={3}>
            Start
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={startedAt}
              onChange={(e) => setStartedAt(e.target.value)}
            />
          </Col>
        </Form.Group>
      </div>

      <div className="col-auto">
        <Form.Group as={Row} controlId="endedAt">
          <Form.Label column sm={3}>
            End
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={endedAt}
              onChange={(e) => setEndedAt(e.target.value)}
            />
          </Col>
        </Form.Group>
      </div>

      <div className="col-auto">
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">
              <i className="fas fa-filter secondary"></i>
            </Button>
          </Col>
        </Form.Group>
      </div>
    </Form>
  );
};

export default FilterForm;

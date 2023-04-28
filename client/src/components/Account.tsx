import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Alert, Button, Card, ListGroup, Col, Row, Container } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { showAlert } from '../slices/alertSlice';
import Avatar from './Avatar';
import UserModal from './UserModal';
import { 
  removeUserTeam, 
  selectAccounts, 
  selectAccountsLoading, 
  deleteAccount, 
  selectAccountsError, 
  fetchAccounts,
  addUserTeam
} from '../slices/accountsSlice';
import { 
  fetchUsers, 
  selectUsers, 
} from '../slices/usersSlice';
import AccountForm from './AccountForm';
import { IAccount } from '../globals';

const Accounts: React.FC = () => {
  const dispatch = useAppDispatch();
  const accounts = useSelector(selectAccounts);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectAccountsLoading);
  const error = useSelector(selectAccountsError);

  const [showModalUser, setShowModalUser] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState<IAccount>();
  const [showModalForm, setShowModalForm] = useState(false);

  const handleDeleteAccount = async (account: string) => {
    try {
      await dispatch(deleteAccount(account)).unwrap();
      dispatch(showAlert({ message: `Account deleted with id: ${account}` }));
    } catch (error: any) {
      dispatch(showAlert({ message: error, variant: 'danger' }));
    }
  };

  const handleRemoveUserTeam = async (query: any) => {
    try {
      await dispatch(removeUserTeam(query)).unwrap();
      dispatch(showAlert({ message: `User removed` }));
    } catch (error: any) {
      dispatch(showAlert({ message: error, variant: 'danger' }));
    }
  };

  // when the admin add new user to the team
  const handleSelectUser = async (userId: string) => {
    setShowModalUser(false);
    try {
      await dispatch(addUserTeam({ userId, accountId })).unwrap();
      dispatch(showAlert({ message: `User Added to the account team` }));
    } catch (error) {
      dispatch(showAlert({ message: 'Error added user to the team', variant: 'danger' }));
    }
  };

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderCards = () => {
    return accounts.map(account => (
      <Col key={account._id}>
      <Card style={{ width: '288px', margin: "10px" }}>
        <Avatar name={account.name} />
        <Card.Body>
          <Card.Title>{ account.name }</Card.Title>
          <Card.Text>{ account.client }</Card.Text>
          <Card.Text><span className='badge bg-secondary text-wrap'>Responsible:</span> { account.responsible.name }</Card.Text>
       
          <Button
            size='sm'
            variant="secondary"
            onClick={() => { setShowModalUser(true); setAccountId(account._id); }}>
            <i className="fas fa-user secondary"></i>
            + add user team
          </Button>

        </Card.Body>
        <ListGroup className="list-group-flush scrollTeams">
          {
            account.team.map(user => (
              <ListGroup.Item  key={user._id}>
                <i className="fas fa-trash text-danger" onClick={() => handleRemoveUserTeam({ accountId: account._id, userId: user._id })}></i>
                { user.name }
              </ListGroup.Item>
            ))
          }
        </ListGroup>
        <Card.Body>
          <Button
            size='sm'
            variant="primary"
            onClick={() => { setAccount(account); setShowModalForm(true); }}>
            <i className="fas fa-edit primary"></i>
          </Button>
          <Button
            size='sm'
            variant="danger"
            onClick={() => handleDeleteAccount(account._id)}>
            <i className="fas fa-trash danger"></i>
          </Button>

        </Card.Body>
      </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <h2>
        Accounts 
        <Button variant="secondary" onClick={_=> setShowModalForm(true)}>+</Button>
        <AccountForm show={showModalForm} account={account!} onSuccess={() => { setShowModalForm(false); setAccount(null!); }} />
      </h2>

      <UserModal
        show={showModalUser}
        users={users}
        onHide={() => setShowModalUser(false)}
        onSelect={handleSelectUser}
      />

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : 
      <Row>
       {renderCards()} 
      </Row>
            
      }
    </Container>
  );
};

export default Accounts;
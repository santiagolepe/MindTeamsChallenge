import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, selectUsers, selectUsersLoading, selectUsersError, removeUser } from '../slices/usersSlice';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { IUser } from '../globals';
import UserForm from './UserForm';
import { showAlert } from '../slices/alertSlice';

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<IUser>(null!);

  const handleDeleteUser = async (userId: string) => {
    try {
      await dispatch(removeUser(userId)).unwrap();
      dispatch(showAlert({ message: `user deleted with id: ${userId}` }));
    } catch (error: any) {
      dispatch(showAlert({ message: error, variant: 'danger' }));
    }
  };

  const handleEditUser = async (user: IUser) => {
    setUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderTableBody = () => {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    return sortedUsers.map((user: IUser) => (
      <tr key={user._id}>
        <td>
          <Button
            size='sm'
            variant="danger"
            onClick={() => handleDeleteUser(user._id)}>
            <i className="fas fa-trash danger"></i>
          </Button>
          <Button
            size='sm'
            variant="info"
            onClick={() => handleEditUser(user)}>
            <i className="fas fa-edit primary"></i>
          </Button>
        </td>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.englishLevel}</td>
        <td>{user.resumeLink}</td>
        <td>{new Date(user.created_at).toUTCString()}</td>
      </tr>
    ));
  };

  return (
    <div className='content'>
      <h2>
        Users 
        <Button size='sm' variant="secondary" onClick={() => setShowModal(true)}>+</Button>
      </h2>
      
      <UserForm show={showModal} user={user} onSuccess={() => { setShowModal(false); setUser(null!); }} />
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
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rol</th>
              <th>English Level</th>
              <th>Resume Link</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </Table>
      )}
    </div>
  );
};

export default Users;

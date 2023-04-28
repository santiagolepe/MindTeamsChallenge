import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransfers, selectTransfersLoading, selectTransfersError, filterTransfers } from '../slices/transfersSlice';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { IFilter, ITransfer } from '../globals';
import FilterForm from './FilterForm';
import { selectAccounts, fetchAccounts } from '../slices/accountsSlice';
import { selectUsers, fetchUsers } from '../slices/usersSlice';

const Transfers: React.FC = () => {
  const dispatch = useAppDispatch();
  const transfers = useSelector(selectTransfers);
  const loading = useSelector(selectTransfersLoading);
  const error = useSelector(selectTransfersError);
  const accounts = useSelector(selectAccounts);
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderTableBody = () => {
    return transfers.map((transfer: ITransfer) => (
      <tr key={transfer._id}>
        <td>{transfer._id}</td>
        <td>{transfer.user.name}</td>
        <td>{transfer.account.name}</td>
        <td>{transfer.account.client}</td>
        <td>{new Date(transfer.started_at).toUTCString()}</td>
        <td>{ transfer.ended_at ? new Date(transfer.ended_at).toUTCString() : '' }</td>
      </tr>
    ));
  };

  const handleSubmit = (filter: IFilter) => {
    dispatch(filterTransfers(filter));
  };

  return (
    <div className='content'>
      <h2>Transfers </h2>
      <FilterForm users={users} accounts={accounts} onSubmit={handleSubmit} />
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
              <th>ID</th>
              <th>Name</th>
              <th>Account</th>
              <th>Client</th>
              <th>Started at</th>
              <th>Ended at</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </Table>
      )}
    </div>
  );
};

export default Transfers;

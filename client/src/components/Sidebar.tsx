import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar: React.FC = () => {
  return (
    <Nav className="flex-column bg-light sidebar">
      <LinkContainer to="/users">
        <Nav.Link>Users</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/accounts">
        <Nav.Link>Accounts</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/transfers">
        <Nav.Link>Transfers</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default Sidebar;
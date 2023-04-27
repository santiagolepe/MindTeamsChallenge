import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { logoutUser } from '../slices/authSlice';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginButton = !token ? (
    <Nav.Link href="/login">Login</Nav.Link>
  ) : (
    <NavDropdown title={user?.name} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">MIND</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className=" ms-auto pe-md-5 navbar-nav">
          {loginButton}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
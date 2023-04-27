import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Users from './components/Users';
import { RootState } from './store';
import { RequireAuth } from './components/RequireAuth';
import Alert from './components/Alert';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  return (
    <>
      <Container>
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            {...alert}
          />
        ))}
      </Container>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>}>
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

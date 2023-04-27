import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { IAlertProps } from '../globals';

const AlertMessage: React.FC<IAlertProps> = ({ message, variant = 'success', timeout = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!visible) return null;

  return (
    <Alert variant={variant} onClose={() => setVisible(false)} dismissible>
      {message}
    </Alert>
  );
};

export default AlertMessage;

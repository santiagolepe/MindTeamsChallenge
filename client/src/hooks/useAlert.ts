import { useState } from 'react';
import { IAlertProps } from '../globals';

const useAlert = () => {
  const [alerts, setAlerts] = useState<IAlertProps[]>([]);

  const showAlert = (options: IAlertProps) => {
    setAlerts((prevAlerts) => [...prevAlerts, options ]);
    console.log(alerts)
  };

  const removeAlert = (index: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert, i) => i !== index));
  };

  return { alerts, showAlert, removeAlert };
};

export default useAlert;

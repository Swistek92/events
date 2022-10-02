import React, { useContext } from 'react';
import Event from './Components/Form/Event';
import Notification from './Components/notyfication/notyfication';
import NotificationContext from './store/notification-context';
const App = () => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotyfication = notificationCtx.notification;
  return (
    <>
      <Event />
      {activeNotyfication && (
        <Notification
          title={activeNotyfication.title}
          message={activeNotyfication.message}
          status={activeNotyfication.status}
        />
      )}
    </>
  );
};

export default App;

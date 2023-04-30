//

import React, { useMemo, useEffect, useState } from "react";
import { Drawer, Placeholder, Notification } from "rsuite"
import { useAuth } from "../../../Context/AuthProvider";
import Api from "../../../app/useApi";

interface NotificationProps {
  open: boolean;
  notificationCount: number;
  setNotificationCount: any;
  setOpen: (open: boolean) => void;
}

const Message = React.forwardRef(({ type = "info", body = undefined, ...rest }: any, ref) => {
  return (
    <Notification ref={ref} {...rest} type={type} header={type}>
      {body ? body :
        <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
      }
    </Notification>
  );
});

const NotificationPanel = ({ open, setOpen, notificationCount, setNotificationCount }: NotificationProps): JSX.Element => {
  const [notification, setNotification] = useState<JSX.Element[]>([]);
  const [refreshTime, setRefreshTime] = useState<number>(Date.now());
  const auth = useAuth();
  const api = useMemo(() => new Api(auth), [auth]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response: any[] = await api.useApi('GET', '/notification/maturity');
        const notificationArr: JSX.Element[] = response.map(({ MPHONE, ID }: any, index) => (
          <Message style={{ width: '100%' }} type="info" body={`Account ${MPHONE} witch is ${ID === 'RECURRING' ? "Recurring" : "Demand"} product have been mature at unknown Date. Please run close process.`} key={index} />
        ));
        setNotification(notificationArr);
        setNotificationCount(response.length);
      } catch (error) {
        setNotification([<Message type="info" key={0} />]);
        setNotificationCount(0);
      }
    }

    const intervalId = setInterval(() => {
      setRefreshTime(Date.now());
    }, 3600000); // Refresh every hour

    fetchNotification();

    return () => clearInterval(intervalId);
  }, [api, refreshTime, setNotification, setNotificationCount]);

  return (
    <Drawer
      // placement='top'
      autoFocus={true}
      backdrop={true}

      open={open}
      onClose={() => setOpen(false)}
    >
      <Drawer.Header>
        <Drawer.Title>Notification</Drawer.Title>
      </Drawer.Header>
      <div style={{ overflowY: 'auto', height: '100%' }}>
        {/* Drawer content */}
        {notification}
      </div>
    </Drawer>
  );
};

export default NotificationPanel;

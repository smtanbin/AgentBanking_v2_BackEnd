import React from "react";
import { Drawer, Placeholder, Button } from "rsuite"

interface NotificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Notification = ({ open, setOpen }: NotificationProps): JSX.Element => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Notification</Drawer.Title>
        {/* <Drawer.Actions>
          <Button>Cancel</Button>
          <Button appearance="primary">Confirm</Button>
        </Drawer.Actions> */}
      </Drawer.Header>
      <Drawer.Body>
        <Placeholder.Paragraph />
      </Drawer.Body>
    </Drawer>
  )
}

export default Notification

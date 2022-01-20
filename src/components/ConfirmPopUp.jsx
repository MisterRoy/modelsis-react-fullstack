import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

export default function ConfirmPopUp({
  message = 'Confirm Pop-Up',
  open = true,
  onClose = () => null,
}) {
  return (
    <Dialog open={open}>
      <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>

      <DialogActions>
        <Button onClick={() => onClose(false)}>No</Button>
        <Button onClick={() => onClose(true)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

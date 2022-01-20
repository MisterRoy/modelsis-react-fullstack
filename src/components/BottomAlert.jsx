import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function BottomAlert({
  open = true,
  onClose = () => null,
  severity = 'success',
  message = 'Bottom Alert !',
  duration = 3000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => onClose(false)}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

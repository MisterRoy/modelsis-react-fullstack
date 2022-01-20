import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function ActivityIndicator() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='80vh'
    >
      <CircularProgress />
    </Box>
  );
}

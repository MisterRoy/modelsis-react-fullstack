import React, { useEffect, useState, useRef } from 'react';
import AppBar from '../components/AppBar';
import {
  Container,
  Typography,
  Box,
  TextField,
  Stack,
  MenuItem,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  createProductType,
  getProductTypes,
} from '../services/productsService';
import BottomAlert from '../components/BottomAlert';

const productTypes = ['Smartphone', 'Laptop', 'Bluetooth Speaker'];

const AddProductTypePage = () => {
  const navigate = useNavigate();
  const textField = useRef();
  const [productType, setProductType] = useState('');
  const [error, setError] = useState(false);
  const [helperMessage, setHelperMessage] = useState('');

  const [addSuccess, setAddSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {});

  function handleChange(event) {
    setProductType(event.target.value);
  }

  async function handleProdcutAdd() {
    // Validate input
    if (productType === '') {
      setError(true);
      setHelperMessage('Name is required !');
      return;
    }

    try {
      await createProductType(productType);

      setAlertMessage('Type successfully added !');
      setAlertSeverity('success');
      setAddSuccess(true);

      setProductType('');
    } catch (error) {
      const response = error.response;
      if (response) {
        console.log(`ERROR ${error}`);
        setError(true);
        setHelperMessage(response.data);
      } else {
        setAlertMessage('Network Error');
        setAlertSeverity('error');
        setAddSuccess(true);
      }
    }
  }

  return (
    <div>
      <AppBar />

      <Container maxWidth='md'>
        <Box sx={{ margin: 2 }}>
          <Box margin={4}>
            <Typography variant='h3' align='center'>
              Add Product Type
            </Typography>
          </Box>

          <BottomAlert
            message={alertMessage}
            severity={alertSeverity}
            open={addSuccess}
            duration={700}
            onClose={() => {
              setAddSuccess(false);
              navigate('/');
            }}
          />

          <Container maxWidth='sm'>
            <Stack spacing={8} bgcolor='#ff' justifyContent='space-between'>
              <TextField
                inputRef={textField}
                id='outlined-basic'
                label='Name*'
                variant='outlined'
                value={productType}
                onChange={handleChange}
                error={error}
                helperText={helperMessage}
                onFocus={() => {
                  setError(false);
                  setHelperMessage('');
                }}
              />

              <Stack direction='row' spacing={2} justifyContent='space-between'>
                <Typography>* Required</Typography>
                <Stack direction='row' spacing={2} alignSelf={'flex-end'}>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => handleProdcutAdd()}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Container>
    </div>
  );
};

export default AddProductTypePage;

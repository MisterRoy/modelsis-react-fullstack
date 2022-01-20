import React, { useState, useEffect } from 'react';
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
import { createProduct, getProductTypes } from '../services/productsService';
import BottomAlert from '../components/BottomAlert';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [productTypes, setProductTypes] = useState(['']);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');

  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const [nameHelperMessage, setNameHelperMessage] = useState('');
  const [typeHelperMessage, setTypeHelperMessage] = useState('');

  const [addSuccess, setAddSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    async function fetchProductTypes() {
      setProductTypes(await getProductTypes());
    }
    try {
      fetchProductTypes();
      setFieldsDisabled(false);
    } catch (error) {
      console.log(error.message);

      setAlertMessage('Network Error');
      setAlertSeverity('error');
      setAddSuccess(true);
    }
  }, []);

  function handleOnNameChange(event) {
    setProductName(event.target.value);
  }

  function handleOnTypeChange(event) {
    setProductType(event.target.value);
  }

  async function handleOnSave() {
    let isFormCorrect = true;
    if (productName === '') {
      isFormCorrect = false;
      setNameError(true);
      setNameHelperMessage('Name is required');
    }
    if (productType === '') {
      isFormCorrect = false;
      setTypeError(true);
      setTypeHelperMessage('Type is required');
    }

    if (!isFormCorrect) return;

    try {
      await createProduct({
        name: productName,
        type: productType,
      });

      setAlertMessage('Product successfully added !');
      setAlertSeverity('success');
      setAddSuccess(true);

      setProductName('');
      setProductType('');
    } catch (error) {
      const response = error.response;
      if (response.data.includes('type')) {
        setTypeError(true);
        setTypeHelperMessage(response.data);
      } else if (response.data.includes('exists')) {
        setNameError(true);
        setNameHelperMessage(response.data);
      }
    }
  }

  return (
    <div>
      <AppBar />

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

      <Container maxWidth='md'>
        <Box sx={{ margin: 2 }}>
          <Box margin={4}>
            <Typography variant='h2' align='center'>
              Add Product
            </Typography>
          </Box>

          <Container maxWidth='sm'>
            <Stack spacing={2} bgcolor='#ff'>
              <TextField
                disabled={fieldsDisabled}
                id='outlined-basic'
                label='Name*'
                variant='outlined'
                onChange={handleOnNameChange}
                error={nameError}
                helperText={nameHelperMessage}
                onFocus={() => {
                  setNameError(false);
                  setNameHelperMessage('');
                }}
              />
              <TextField
                disabled={fieldsDisabled}
                id='outlined-basic'
                label='Product Type*'
                variant='outlined'
                select
                defaultValue={''}
                onChange={handleOnTypeChange}
                error={typeError}
                helperText={typeHelperMessage}
                onFocus={() => {
                  setTypeError(false);
                  setTypeHelperMessage('');
                }}
              >
                {productTypes.map((p) => {
                  return (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  );
                })}
              </TextField>

              <Stack
                direction='row'
                spacing={2}
                margin={5}
                justifyContent='space-between'
              >
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
                  <Button variant='contained' onClick={() => handleOnSave()}>
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

export default AddProductPage;

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
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProduct,
  getProductTypes,
  updateProduct,
} from '../services/productsService';
import BottomAlert from '../components/BottomAlert';

const _productTypes = ['Smartphone', 'Laptop', 'Bluetooth Speaker'];

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productTypes, setProductTypes] = useState(['', '']);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [product, setProduct] = useState();

  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const [nameHelperMessage, setNameHelperMessage] = useState('');
  const [typeHelperMessage, setTypeHelperMessage] = useState('');

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(async () => {
    try {
      const _product = await getProduct(id);
      setProductTypes(await getProductTypes());
      setProduct(_product);
      setProductName(_product.name);
      setProductType(_product.type);
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  }, []);

  async function handleUpdate() {
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
      const response = await updateProduct({
        _id: product._id,
        name: productName,
        type: productType,
      });
      setUpdateSuccess(true);
    } catch (error) {
      const response = error.response;
      if (response.data.includes('name') || response.data.includes('already')) {
        setNameError(true);
        setNameHelperMessage(response.data);
      } else if (response.data.includes('type')) {
        setTypeError(true);
        setTypeHelperMessage(response.data);
      }
    }
  }

  function handleOnNameType(event) {
    setProductName(event.target.value);
  }

  function handleOnTypeSelect(event) {
    setProductType(event.target.value);
  }

  return (
    <div>
      <AppBar />

      <BottomAlert
        message='Product successfully updated !'
        severity='success'
        open={updateSuccess}
        duration={700}
        onClose={() => {
          setUpdateSuccess(false);
          navigate('/');
        }}
      />

      <Container maxWidth='md'>
        <Box sx={{ margin: 2 }}>
          <Box margin={4}>
            <Typography variant='h2' align='center'>
              Update Product
            </Typography>
          </Box>

          <Container maxWidth='sm'>
            <Stack spacing={2} bgcolor='#ff'>
              <TextField
                id='outlined-basic'
                label='Name*'
                variant='outlined'
                value={productName}
                onChange={handleOnNameType}
                error={nameError}
                helperText={nameHelperMessage}
                onFocus={() => {
                  setNameError(false);
                  setNameHelperMessage('');
                }}
              />
              <TextField
                id='outlined-basic'
                label='Product Type*'
                variant='outlined'
                select
                helperText='Please select a product type'
                value={productType}
                onChange={handleOnTypeSelect}
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
                  <Button variant='contained' onClick={() => handleUpdate()}>
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

export default UpdateProductPage;

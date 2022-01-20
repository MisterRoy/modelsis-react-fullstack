import React, { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../services/productsService';
import ActivityIndicator from '../components/ActivityIndicator';
import BottomAlert from '../components/BottomAlert';
import { formatDate } from '../services/date';
import ConfirmPopUp from '../components/ConfirmPopUp';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [popUpEnbaled, setPopUpEnbaled] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('Delete product ?');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    async function fetchProducts() {
      let _products = await getProducts();
      _products = _products.map((p) => {
        return { ...p, creationDate: formatDate(p.creationDate) };
      });
      setProducts(_products);
    }
    try {
      fetchProducts();
    } catch (error) {
      setAlertMessage('Network Error');
      setAlertSeverity('error');
      setDeleteSuccess(true);
    }
    setPageLoading(false);
  }, []);

  async function handleDeleteProduct(product) {
    setProductIdToDelete(product._id);
    setPopUpMessage(`Delete ${product.name} ?`);
    setPopUpEnbaled(true);
  }

  function handleEditProduct(productId) {
    navigate(`/product/${productId}`);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'creationDate', headerName: 'Creation Date', width: 160 },
    { field: 'type', headerName: 'Type', width: 150 },
    {
      field: 'Action',
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Stack direction='row' spacing={2}>
            {/* Edit icon */}
            <IconButton
              onClick={() => handleEditProduct(cellValues.row['_id'])}
            >
              <Edit />
            </IconButton>

            {/* Delete icon */}
            <IconButton onClick={() => handleDeleteProduct(cellValues.row)}>
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return pageLoading ? (
    <ActivityIndicator />
  ) : (
    <div>
      <AppBar />

      <BottomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
      />

      <ConfirmPopUp
        message={popUpMessage}
        open={popUpEnbaled}
        onClose={async (canDelete) => {
          if (canDelete) {
            try {
              await deleteProduct(productIdToDelete);
              setProducts(await getProducts());

              setAlertMessage('Product successfully deleted !');
              setAlertSeverity('success');
              setDeleteSuccess(true);
            } catch (error) {
              console.log(error.message);
            }
            setProductIdToDelete('');
          }
          setPopUpEnbaled(false);
        }}
      />

      <Container maxWidth='md'>
        <Box sx={{ margin: 2 }}>
          <Typography variant='h2' align='center'>
            Products
          </Typography>
        </Box>

        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={products} columns={columns} />
        </div>

        <Stack>
          <Stack direction='row' spacing={2} margin={5} alignSelf={'flex-end'}>
            <Button
              variant='outlined'
              onClick={() => {
                navigate('/product-type');
              }}
            >
              Add Type
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                navigate('/product');
              }}
            >
              Add Product
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default ProductsPage;

import React, { useState } from "react";
import AppBar from "../components/AppBar";
import {
  Container,
  Typography,
  Box,
  TextField,
  Stack,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const _productTypes = ["Smartphone", "Laptop", "Bluetooth Speaker"];

const AddProductPage = () => {
  let navigate = useNavigate();
  const [productTypes, setProductTypes] = useState(_productTypes);

  return (
    <div>
      <AppBar />
      <Container maxWidth="md">
        <Box sx={{ margin: 2 }}>
          <Box margin={4}>
            <Typography variant="h2" align="center">
              Add Product
            </Typography>
          </Box>

          <Container maxWidth="sm">
            <Stack spacing={2} bgcolor="#ff">
              <TextField id="outlined-basic" label="Name*" variant="outlined" />
              <TextField
                id="outlined-basic"
                label="Product Type"
                variant="outlined"
                select
                helperText="Please select a product type"
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
                direction="row"
                spacing={2}
                margin={5}
                justifyContent="space-between"
              >
                <Typography>* Required</Typography>
                <Stack direction="row" spacing={2} alignSelf={"flex-end"}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained">Save</Button>
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

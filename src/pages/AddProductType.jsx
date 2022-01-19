import React from "react";
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

const productTypes = ["Smartphone", "Laptop", "Bluetooth Speaker"];

const AddProductTypePage = () => {
  return (
    <div>
      <AppBar />
      <Container maxWidth="md">
        <Box sx={{ margin: 2 }}>
          <Box margin={4}>
            <Typography variant="h3" align="center">
              Add Product Type
            </Typography>
          </Box>

          <Container maxWidth="sm">
            <Stack spacing={8} bgcolor="#ff" justifyContent="space-between">
              <TextField id="outlined-basic" label="Name*" variant="outlined" />

              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography>* Required</Typography>
                <Stack direction="row" spacing={2} alignSelf={"flex-end"}>
                  <Button variant="contained" color="error">
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

export default AddProductTypePage;

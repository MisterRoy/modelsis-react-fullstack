import React from "react";
import AppBar from "../components/AppBar";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material/";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const rows = [
  { id: 1, name: "iPhone X", creationDate: "19/01/2022", type: "Smartphone" },
  { id: 2, name: "iPhone SE", creationDate: "19/01/2022", type: "Smartphone" },
  {
    id: 3,
    name: "Lenovo Legion Slim 7",
    creationDate: "19/01/2022",
    type: "Laptop",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "creationDate", headerName: "Creation Date", width: 120 },
  { field: "type", headerName: "Type", width: 150 },
  {
    field: "Action",
    width: 100,
    renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2}>
          {/* Edit icon */}
          <IconButton>
            <Edit />
          </IconButton>

          {/* Delete icon */}
          <IconButton>
            <Delete />
          </IconButton>
        </Stack>
      );
    },
  },
];

const ProductsPage = () => {
  return (
    <div>
      <AppBar />

      <Container maxWidth="md">
        <Box sx={{ margin: 2 }}>
          <Typography variant="h2" align="center">
            Products
          </Typography>
        </Box>

        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <Stack>
          <Stack direction="row" spacing={2} margin={5} alignSelf={"flex-end"}>
            <Button variant="contained">Add Prodcut</Button>
            <Button variant="contained">Add Type</Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default ProductsPage;

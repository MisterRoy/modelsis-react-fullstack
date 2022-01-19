import React from "react";
import AppBar from "./components/AppBar";
import { Container, Box, Typography } from "@mui/material/";

const App = () => {
  return (
    <div>
      <AppBar />
      <Container maxWidth="md">
        <Typography variant="h2" align="center">
          Hello
        </Typography>

        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>
    </div>
  );
};

export default App;

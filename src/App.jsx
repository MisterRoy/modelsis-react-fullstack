import React from "react";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import AddProductTypePage from "./pages/AddProductType";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <ProductsPage /> */}
      {/* <AddProductPage /> */}
      {/* <AddProductTypePage /> */}
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        {/* <Route path="/product/:id" element={<AddProductPage />} /> */}
        <Route path="/product" element={<AddProductPage />} />
        <Route path="/product-type" element={<AddProductTypePage />} />
      </Routes>
    </div>
  );
};

export default App;

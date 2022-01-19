import React from "react";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import AddProductTypePage from "./pages/AddProductType";

const App = () => {
  return (
    <div>
      <ProductsPage />
      <AddProductPage />
      <AddProductTypePage />
    </div>
  );
};

export default App;

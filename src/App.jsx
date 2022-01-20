import React from 'react';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import AddProductTypePage from './pages/AddProductType';
import { Route, Routes } from 'react-router-dom';
import UpdateProductPage from './pages/UpdateProductPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/product' element={<AddProductPage />} />
        <Route path='/product/:id' element={<UpdateProductPage />} />
        <Route path='/product-type' element={<AddProductTypePage />} />
      </Routes>
    </div>
  );
};

export default App;

import axios from 'axios';

const apiUrl = 'http://192.168.1.21:4000/api';

export async function getProductTypes() {
  const response = await axios.get(`${apiUrl}/productType`);
  const productTypes = response.data.map((product) => product.name);
  return productTypes;
}

export async function createProductType(productType) {
  const response = await axios.post(`${apiUrl}/productType`, {
    name: productType,
  });
  return response.data;
}

export async function getProducts() {
  const response = await axios.get(`${apiUrl}/products`);
  const products = response.data.map((product, index) => {
    return {
      id: index + 1,
      ...product,
    };
  });
  return products;
}

export async function getProduct(productId) {
  const response = await axios.get(`${apiUrl}/products/${productId}`);
  const product = {
    id: response.data['_id'],
    ...response.data,
  };
  return product;
}

export async function deleteProduct(productId) {
  const response = await axios.delete(`${apiUrl}/products/${productId}`);
  return response.data;
}

export async function updateProduct(product) {
  const response = await axios.put(`${apiUrl}/products/${product['_id']}`, {
    name: product.name,
    type: product.type,
  });
  return response.data;
}

export async function createProduct(product) {
  const response = await axios.post(`${apiUrl}/products`, product);
  return response.data;
}

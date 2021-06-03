import apiHandler from "./apiHandler";

export const getAllProducts = async () => {
    const url = '/products';
    const res = await apiHandler.get(url);
    return res;
}

export const createProduct = async (product) => {
    const url = '/products';
    const data = await apiHandler.post(url, product);
    return data;
}

export const getOneProduct =  async (idProduct) => {
    const url = `/products/${idProduct}`;
    const product = await apiHandler.get(url);
    return product;
}

export const updateProductById = async (product) => {
    const url = `/products/${product._id}`;
    const productResult = await apiHandler.put(url, product);
    return productResult;

}

export const deleteProductById = async (id) => {
    const url = `/products/${id}`;
    const productResult = await apiHandler.delete(url);
    return productResult;
}
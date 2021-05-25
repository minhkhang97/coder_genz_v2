import apiHandler from "./apiHandler";

export const getAllProducts = async () => {
    const url = '/products';
    const res = await apiHandler.get(url);
    console.log(res);
    console.log('asjdhasjk');
    return res;
}

export const createProduct = async (product) => {
    const url = '/products';
    console.log(product);
    const data = await apiHandler.post(url, product);
    console.log(data);
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
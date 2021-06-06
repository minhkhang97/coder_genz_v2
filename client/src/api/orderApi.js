import apiHandler from "./apiHandler";

export const createOrder = async (order) => {
    const url = '/order/v2';
    const data = await apiHandler.post(url, order);
    return data;
}

export const getAllOrder = async () => {
    const data = await apiHandler.get('/order');
    return data;
}

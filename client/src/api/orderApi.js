import apiHandler from "./apiHandler";

export const createOrder = async (order) => {
    const url = '/order';
    const data = await apiHandler.post(url, order);
    return data;
}

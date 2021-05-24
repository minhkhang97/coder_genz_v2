import apiClient from "./apiHandler";

export const getAllCategories = async () => {
    const url = '/categories';
    const categories = await apiClient.get(url);
    return categories;
}
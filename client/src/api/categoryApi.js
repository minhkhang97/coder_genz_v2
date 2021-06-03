import apiHandler from "./apiHandler";

export const getAllCategories = async () => {
    const url = '/categories';
    const categories = await apiHandler.get(url);
    return categories;
};

export const getOneCategory = async (id) => {
    const url = `/categories/${id}`;
    const category = await apiHandler.get(url);
    return category;
}

export const createCategory = async (category) => {
    const url = '/categories';
    let temp = {...category};
    temp.products = category.products.map(el => el._id);
    const categoryResult = await apiHandler.post(url, temp);
    return categoryResult; 
}

export const updateCategoryById = async (category) => {
    const url = `/categories/${category._id}`;
    let temp = {...category};
    temp.products = category.products.map(el => el._id);
    const categoryResult = await apiHandler.put(url, temp);
    return categoryResult;
}

export const deleteCategoryById = async (id) => {
    const url = `/categories/${id}`;
    const res = await apiHandler.delete(url);
    return res;
}
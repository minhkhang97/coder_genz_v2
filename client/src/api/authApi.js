import apiHandler from "./apiHandler";

export const login = async (email, password) => {
    const url = '/auth/admin/login';
    const res = await apiHandler.post(url, {email, password});
    return res;
}

//get user

export const getUser = async () => {
    const url = '/auth/admin';
    const res = await apiHandler.get(url);
    return res;
}
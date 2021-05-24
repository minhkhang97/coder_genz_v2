import axios from "axios";
import queryString from 'query-string';

const apiHandler = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: parms => queryString.stringify(parms),
});

apiHandler.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + accessToken;
    return config;
});

apiHandler.interceptors.response.use(res => {
    if(res && res.data){
        return res.data;
    }
    return res;
});

export default apiHandler;
import axios from "axios";
import apiHandler from "./apiHandler";

export const login = async (email, password) => {
  const url = "/auth/admin/login";
  try {
    const response = await apiHandler.post(url, { email, password });
    return response;
  } catch (error) {
    console.error(error);
  }
};

//get user

export const getUser = async () => {
  const url = "/auth/admin";
  const res = await apiHandler.get(url);
  return res;
};

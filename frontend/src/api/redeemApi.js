import api from "./axiosInstance";

export const getProducts=async()=>{
    const res = await api.get("/products/public");
    return res.data;
}
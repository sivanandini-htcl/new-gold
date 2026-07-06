import api from "./axiosInstance";
export const addToCart=async(data)=>{
    const res=await api.post("/cart/add",data);
    return res.data;
}
// export const deleteCartItem=async(id,reason)=>{
//     const res=await api.post(`/cart/delete/${id}`,{
//         data:{reason}});
//         return res.data;
// }
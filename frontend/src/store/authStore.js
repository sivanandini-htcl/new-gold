import {create} from "zustand";

const useAuthStore=create((set)=>({

    user:null,
    token:null,
    refreshToken:null,
    

    setAuth:(data)=> set({
      user:data.user,
      token:data.accessToken,
      refreshToken:data.refreshToken,
    }),

  

    logout:()=>set({ user:null,
      token:null,
      refreshToken:null}),
      setLoading: (value) =>
    set({
      isLoading: value,
    }),

}));

export default useAuthStore;

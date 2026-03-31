import {create} from "zustand";

const useAuthStore=create((set)=>({

    user:null,
    token:null,

  setUser: (user) => set({ user: user }),
  setToken: (token) => set({ token: token }),

    logout:()=>set({ user:null,token:null})

}))

export default useAuthStore;

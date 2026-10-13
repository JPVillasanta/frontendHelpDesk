import {createContext,useContext,useEffect,useState} from "react";
import {authApi} from "../services/api";
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!localStorage.getItem("product_token")){setLoading(false);return;}authApi.me().then(r=>setUser(r.user)).catch(()=>localStorage.removeItem("product_token")).finally(()=>setLoading(false));},[]);
 async function login(credentials){const result=await authApi.login(credentials);localStorage.setItem("product_token",result.token);setUser(result.user);}
 async function logout(){try{await authApi.logout();}finally{localStorage.removeItem("product_token");setUser(null);}}
 return <AuthContext.Provider value={{user,loading,login,logout}}>{children}</AuthContext.Provider>}
export function useAuth(){return useContext(AuthContext);}
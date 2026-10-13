const API_BASE = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/v1`;
export async function api(path, options = {}) {
 const token=localStorage.getItem("product_token");
 const headers={"Accept":"application/json","Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`:{}),...options.headers};
 const response=await fetch(`${API_BASE}${path}`,{...options,headers});
 const body=await response.json().catch(()=>({}));
 if(!response.ok){const message=body.message||Object.values(body.errors||{}).flat()[0]||"Request failed";throw new Error(message);}
 return body;
}
export const authApi={login:(data)=>api("/login",{method:"POST",body:JSON.stringify(data)}),me:()=>api("/me"),logout:()=>api("/logout",{method:"POST"})};
export const productApi={list:(search="")=>api(`/products?search=${encodeURIComponent(search)}`),get:(id)=>api(`/products/${id}`),create:(data)=>api("/products",{method:"POST",body:JSON.stringify(data)}),update:(id,data)=>api(`/products/${id}`,{method:"PUT",body:JSON.stringify(data)}),remove:(id)=>api(`/products/${id}`,{method:"DELETE"})};
export const adminApi={stats:()=>api("/admin/stats"),users:(search="")=>api(`/admin/users?search=${encodeURIComponent(search)}`),products:()=>api("/admin/products"),removeUser:(id)=>api(`/admin/users/${id}`,{method:"DELETE"}),removeProduct:(id)=>api(`/admin/products/${id}`,{method:"DELETE"})};
export const isAdmin = (user) => user?.role === 'admin';
export const canManageProduct = (user, product) =>
  isAdmin(user) || Number(user?.id) === Number(product?.user_id);

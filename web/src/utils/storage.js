export const getStoredUser = () => {
  return localStorage.getItem("image");
};

export const setStoredUser = (user) => {
  localStorage.setItem("image", user);
};

export const clearStoredUser = () => {
  localStorage.removeItem("image");
};
// Save logged-in user to browser storage
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};

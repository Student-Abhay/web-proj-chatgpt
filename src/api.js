import axios from "axios";

const API = axios.create({
  baseURL: "https://web-proj-chatgpt-production.up.railway.app/test-db",
});

// Attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Server is completely down
      return Promise.reject(new Error("Cannot connect to server. Please try again later."));
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.error;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    if (status === 403) {
      return Promise.reject(new Error("You don't have permission to do that."));
    }

    if (status === 404) {
      return Promise.reject(new Error("Resource not found."));
    }

    if (status === 500) {
      return Promise.reject(new Error("Server error. Please try again later."));
    }

    // Use backend's own error message if available
    return Promise.reject(new Error(serverMessage || "Something went wrong."));
  }
);

// Products
export const getProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;
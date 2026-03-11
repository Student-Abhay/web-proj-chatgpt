import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getProducts } from "./api";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to load products.");
      if (error.message.includes("Session expired")) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadProducts();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "14px",
            background: "#111827",
            color: "#fff",
            padding: "14px 18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          },
          success: { style: { background: "#16a34a" } },
          error: { style: { background: "#dc2626" } },
        }}
      />

      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer font-semibold text-white">
              Products
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile top header */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            Logout
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-10">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              Product Management
            </h1>
            <AddProduct
              refresh={loadProducts}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
            />
            <ProductList
              products={products}
              refresh={loadProducts}
              setEditingProduct={setEditingProduct}
              isLoading={isLoading}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
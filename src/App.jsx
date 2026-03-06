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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col justify-between z-30
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top navbar */}
        <div className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl font-bold"
          >
            ☰
          </button>
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>

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
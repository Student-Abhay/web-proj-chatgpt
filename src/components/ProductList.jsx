import { deleteProduct, addProduct } from "../api";
import toast from "react-hot-toast";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductList({ products, refresh, setEditingProduct, isLoading }) {

  const handleDelete = async (id) => {
    const productToDelete = products.find((p) => p.id === id);

    try {
      await deleteProduct(id);
      refresh();

      toast((t) => (
        <div className="flex items-center justify-between gap-4">
          <span>Product deleted</span>
          <button
            onClick={async () => {
              try {
                await addProduct({
                  name: productToDelete.name,
                  price: productToDelete.price,
                  quantity: productToDelete.quantity,
                });
                refresh();
                toast.dismiss(t.id);
                toast.success("Product restored!");
              } catch (error) {
                toast.error(error.message || "Failed to restore product.");
              }
            }}
            className="text-blue-400 font-semibold"
          >
            Undo
          </button>
        </div>
      ), { duration: 5000 });

    } catch (error) {
      toast.error(error.message || "Failed to delete product.");
    }
  };

  // Show skeletons while loading
  if (isLoading) {
    return (
      <div className="space-y-3 mt-6">
        {[1, 2, 3].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-lg font-medium">No products yet</p>
        <p className="text-sm">Add your first product above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 gap-3"
        >
          <div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-700 font-medium">₹ {p.price}</p>
            <p className="text-sm text-gray-500">Stock: {p.quantity}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingProduct(p)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
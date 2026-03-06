import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "../api";
import toast from "react-hot-toast";

export default function AddProduct({ refresh, editingProduct, setEditingProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
      setErrors({});
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Product name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }
    if (!quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (Number(quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative.";
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = "Quantity must be a whole number.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSaving(true);
    const loadingToast = toast.loading(
      editingProduct ? "Updating product..." : "Saving product..."
    );
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          name: name.trim(),
          price: Number(price),
          quantity: Number(quantity),
        });
        toast.success("Product updated successfully!", { id: loadingToast });
        setEditingProduct(null);
      } else {
        await addProduct({
          name: name.trim(),
          price: Number(price),
          quantity: Number(quantity),
        });
        toast.success("Product added successfully!", { id: loadingToast });
      }
      refresh();
      setName("");
      setPrice("");
      setQuantity("");
      setErrors({});
    } catch (error) {
      toast.error(error.message || "An error occurred.", { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setQuantity("");
    setErrors({});
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-200 mb-6 md:mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* Fields - stack on mobile, row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prev) => ({ ...prev, price: "" }));
              }}
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                errors.price ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setErrors((prev) => ({ ...prev, quantity: "" }));
              }}
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                errors.quantity ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex-1 ${
              editingProduct ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-xl px-4 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSaving ? "Saving..." : editingProduct ? "Update" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-3 rounded-xl border border-gray-300 text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}
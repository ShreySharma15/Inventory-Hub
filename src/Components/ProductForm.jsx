import React, { useState, useEffect } from 'react';

function ProductForm({ isOpen, onClose, onSave, editingProduct }) {
  // 1) Add a local categories list to remove the undefined reference
  const categories = ["Electronics", "Grocery", "Clothing", "Accessories"];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'Electronics',
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setFormData({
          name: editingProduct.name,
          price: String(editingProduct.price),
          quantity: String(editingProduct.quantity),
          category: editingProduct.category,
        });
      } else {
        setFormData({
          name: '',
          price: '',
          quantity: '',
          category: 'Electronics',
        });
      }
      setErrors({});
    }
  }, [isOpen, editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.quantity || parseInt(formData.quantity) < 0) newErrors.quantity = 'Quantity must be 0 or greater';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
    };

    onSave(productData);
    onClose();
  };

  // Keep this early return
  if (!isOpen) return null;

  return (
    // 2) Make overlay clickable to close, and stop propagation on dialog
    <div
      className="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-white mb-6">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
            {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-semibold btn-hover"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold btn-hover"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

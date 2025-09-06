import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import { useAuth } from "./context/AuthContext";
import {
  createProduct,
  updateProductById,
  deleteProductById,
  subscribeProducts,
} from "./firebase/productsApi";

function App() {
  const { currentUser, logout } = useAuth();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Realtime load products
  useEffect(() => {
    setLoading(true);
    const unsub = subscribeProducts((list) => {
      setProducts(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Add new prodcts
  const handleAddProduct = async (productData) => {
    try {
      await createProduct(productData);
      
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product");
    }
  }

  // Update existing product 
  const handleUpdateProduct = async (productData) => {
    try {
      await updateProductById(editingProduct.id, productData);
     
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  }

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
      
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  }

  // Open form for adding new product
  const openAddForm = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  // Open form for editing product
  const openEditForm = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  // Close form
  const closeForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  //form save
  const handleFormSave = (productData) => {
    if (editingProduct) {
      handleUpdateProduct(productData)
    } else {
      handleAddProduct(productData)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // Calculate simple stats
  const totalProducts = products.length
  const lowStockProducts = products.filter(p => p.quantity < 10).length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-900 text-white">
        Loading products...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-900 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {}
<div className="mb-8">
  {}
  <div className="flex justify-end items-center gap-4 mb-2">
    <div className="text-right">
      <p className="text-sm text-gray-400">Welcome,</p>
      <p className="text-white font-medium">
        {currentUser?.displayName || currentUser?.email}
      </p>
    </div>
    {currentUser?.photoURL && (
      <img 
        src={currentUser.photoURL} 
        alt="Profile" 
        className="w-8 h-8 rounded-full"
      />
    )}
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm btn-hover"
    >
      Sign Out
    </button>
  </div>

  {}
  <div className="w-full flex flex-col items-center mt-4">
  <div className="flex items-center gap-4 mb-2">
    <img 
      src="/InventoryHub-logo.png" 
      alt="Inventory Logo"
      className="h-18 w-18 "
    />
    <h1 className="text-4xl font-bold text-purple-400 leading-normal py-2 text-center">
      Inventory Hub
    </h1>
  </div>
  <p className="text-gray-400 text-center">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     Inventory management system
  </p>
</div>
</div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white">{totalProducts}</div>
            <div className="text-gray-400 text-sm">Total Products</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-red-400">{lowStockProducts}</div>
            <div className="text-gray-400 text-sm">Low Stock Items</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-green-400">
              ₹{totalValue.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Value</div>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={openAddForm}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold btn-hover"
          >
            Add New Product
          </button>
        </div>

        {}
        <ProductTable
          products={products}
          onEdit={openEditForm}
          onDelete={handleDeleteProduct}
          searchTerm={searchTerm}
        />

        {}
        <ProductForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSave={handleFormSave}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  )
}

export default App;

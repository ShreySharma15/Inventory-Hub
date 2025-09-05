import React from 'react'

function ProductTable({ products, onEdit, onDelete, searchTerm }) {
  // Simple search filter
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id)
    }
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">
        Products ({filteredProducts.length})
      </h3>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-gray-300 font-semibold">Name</th>
                <th className="text-left py-3 px-2 text-gray-300 font-semibold">Category</th>
                <th className="text-left py-3 px-2 text-gray-300 font-semibold">Price</th>
                <th className="text-left py-3 px-2 text-gray-300 font-semibold">Quantity</th>
                <th className="text-left py-3 px-2 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-2 text-white">{product.name}</td>
                  <td className="py-3 px-2 text-gray-300">{product.category}</td>
                  <td className="py-3 px-2 text-green-400 font-semibold">₹{product.price}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.quantity < 10 
                        ? 'bg-red-500/20 text-red-300' 
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(product)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm btn-hover"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm btn-hover"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductTable

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import productsData from '../data/productsData'
import '../styles/products.css'

// Parse query param
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Products = () => {
  const query = useQuery()
  const searchTerm = query.get('q')?.toLowerCase() || ''

  const [filters, setFilters] = useState({
    sort: '',
    chemicals: '',
    platform: ''
  })

  // Filter by search term
  let filteredProducts = productsData.filter(p =>
    p.title.toLowerCase().includes(searchTerm)
  )

  // Apply filters
  if (filters.chemicals) {
    filteredProducts = filteredProducts.filter(p => p.chemicals === filters.chemicals)
  }
  if (filters.platform) {
    filteredProducts = filteredProducts.filter(p => p.platform === filters.platform)
  }

  // Apply sorting
  if (filters.sort === 'ecoHigh') {
    filteredProducts.sort((a, b) => b.ecoScore - a.ecoScore)
  } else if (filters.sort === 'ecoLow') {
    filteredProducts.sort((a, b) => a.ecoScore - b.ecoScore)
  } else if (filters.sort === 'carbonLow') {
    filteredProducts.sort((a, b) => a.carbon - b.carbon)
  }

  return (
    <>
      <Navbar />
      <div className="products-page" style={{ display: 'flex', paddingTop: '82px' }}>
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="products-content" style={{ flex: 1, padding: '1rem' }}>
          {filteredProducts.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            <div className="results-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <h3>{product.title}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Eco Score: {product.ecoScore}/100</p>
                  <p>Carbon: {product.carbon}g</p>
                  <p>Plastic: {product.plastic}g</p>
                  <p>Chemicals: {product.chemicals}</p>
                  <p>Platform: {product.platform}</p>
                  <button className="view-product">View Product</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Products
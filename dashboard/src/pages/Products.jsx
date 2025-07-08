import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/products.css'
import Sidebar from '../components/Sidebar'

const dummyData = [
  {
    title: "Dove Soap",
    price: "₹55",
    ecoScore: 72,
    carbon: 120,
    plastic: 15,
    chemicals: "Mild"
  },
  {
    title: "Surf Excel Detergent",
    price: "₹115",
    ecoScore: 45,
    carbon: 180,
    plastic: 45,
    chemicals: "Harsh"
  },
  {
    title: "Colgate Toothpaste",
    price: "₹99",
    ecoScore: 60,
    carbon: 90,
    plastic: 25,
    chemicals: "Medium"
  }
]

const Products = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")?.toLowerCase() || ""
  const [results, setResults] = useState([])

  useEffect(() => {
    if (query) {
      const matched = dummyData.filter(product =>
        product.title.toLowerCase().includes(query)
      )
      setResults(matched)
    }
  }, [query])

  if (!query) return <p style={{ padding: "2rem" }}>🔍 Please enter a product to search.</p>

  return (
    <>
    <Navbar />
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="product-result">
      <h2>Results for “{query}”</h2>

      {results.length === 0 ? (
        <p>❌ No results found for “{query}”.</p>
      ) : (
        <div className="results-grid">
          {results.map((product, i) => (
            <div key={i} className="product-card">
              <h3>{product.title}</h3>
              <p>Price: {product.price}</p>
              <p>Eco Score: {product.ecoScore}/100</p>
              <ul>
                <li>🌱 Carbon: {product.carbon}g</li>
                <li>♻️ Plastic: {product.plastic}g</li>
                <li>☠️ Chemicals: {product.chemicals}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
      </>
  )
}

export default Products
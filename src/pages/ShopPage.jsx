import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products')

        if (!response.ok) {
          throw new Error('error')
        }

        const data = await response.json()

        setProducts(data)
      } catch {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section>
      <h2>Shop</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="shop-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ShopPage
import { useState } from 'react'
import useCart from '../context/useCart'
import QuantityControl from './QuantityControl'

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const updateQuantity = (nextValue) => {
    const parsed = Number.parseInt(nextValue, 10)
    if (Number.isNaN(parsed)) {
      setQuantity(0)
      return
    }
    setQuantity(Math.max(0, parsed))
  }

  const handleAddToCart = () => {
    if (quantity <= 0) return
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <QuantityControl
        value={quantity}
        onChange={(event) => updateQuantity(event.target.value)}
        onIncrement={() => updateQuantity(quantity + 1)}
        onDecrement={() => updateQuantity(quantity - 1)}
        label={`Quantity for ${product.title}`}
      />
      <button type="button" className="primary-button" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </article>
  )
}

export default ProductCard

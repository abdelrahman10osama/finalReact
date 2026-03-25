import { Link } from 'react-router-dom'
import QuantityControl from '../components/QuantityControl'
import useCart from '../context/useCart'

function CartPage() {
  const { cartItems, totalPrice, setQuantity, incrementItem, decrementItem, removeItem } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add items from the shop to see them here.</p>
        <Link to="/shop" className="primary-button inline-button">
          Go To Shop
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map(({ product, quantity }) => (
          <article key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-image" />
            <div className="cart-details">
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)} each</p>
              <p className="subtotal">Subtotal: ${(product.price * quantity).toFixed(2)}</p>
            </div>
            <div className="cart-actions">
              <QuantityControl
                value={quantity}
                onChange={(event) => setQuantity(product.id, event.target.value)}
                onIncrement={() => incrementItem(product.id)}
                onDecrement={() => decrementItem(product.id)}
                label={`Cart quantity for ${product.title}`}
              />
              <button type="button" className="remove-button" onClick={() => removeItem(product.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="cart-total">Cart total: ${totalPrice.toFixed(2)}</p>
    </section>
  )
}

export default CartPage

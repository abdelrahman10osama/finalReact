function QuantityControl({ value, onChange, onIncrement, onDecrement, label = 'Quantity' }) {
  return (
    <div className="quantity-control">
      <label>
        <span className="sr-only">{label}</span>
        <button type="button" className="qty-button" onClick={onDecrement} aria-label={`Decrease ${label}`}>
          -
        </button>
        <input
          type="number"
          min="0"
          value={value}
          onChange={onChange}
          className="qty-input"
          aria-label={label}
        />
        <button type="button" className="qty-button" onClick={onIncrement} aria-label={`Increase ${label}`}>
          +
        </button>
      </label>
    </div>
  )
}

export default QuantityControl

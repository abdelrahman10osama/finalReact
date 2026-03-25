import { useMemo, useReducer } from 'react'
import { CartContext } from './cartStore'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      if (quantity <= 0) return state

      const existingItem = state.items[product.id]
      const nextQuantity = (existingItem?.quantity || 0) + quantity

      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: {
            product,
            quantity: nextQuantity,
          },
        },
      }
    }
    case 'SET_QUANTITY': {
      const { productId, quantity } = action.payload
      const item = state.items[productId]

      if (!item) return state

      if (quantity <= 0) {
        const nextItems = { ...state.items }
        delete nextItems[productId]
        return { ...state, items: nextItems }
      }

      return {
        ...state,
        items: {
          ...state.items,
          [productId]: {
            ...item,
            quantity,
          },
        },
      }
    }
    case 'REMOVE_ITEM': {
      const nextItems = { ...state.items }
      delete nextItems[action.payload.productId]
      return {
        ...state,
        items: nextItems,
      }
    }
    default:
      return state
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} })

  const value = useMemo(() => {
    const cartItems = Object.values(state.items)
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )

    const addToCart = (product, quantity) => {
      const parsedQuantity = Number.parseInt(quantity, 10)
      dispatch({
        type: 'ADD_ITEM',
        payload: { product, quantity: Number.isNaN(parsedQuantity) ? 0 : parsedQuantity },
      })
    }

    const setQuantity = (productId, quantity) => {
      const parsedQuantity = Number.parseInt(quantity, 10)
      dispatch({
        type: 'SET_QUANTITY',
        payload: { productId, quantity: Number.isNaN(parsedQuantity) ? 0 : parsedQuantity },
      })
    }

    const incrementItem = (productId) => {
      const currentItem = state.items[productId]
      if (!currentItem) return
      setQuantity(productId, currentItem.quantity + 1)
    }

    const decrementItem = (productId) => {
      const currentItem = state.items[productId]
      if (!currentItem) return
      setQuantity(productId, currentItem.quantity - 1)
    }

    const removeItem = (productId) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
    }

    return {
      cartItems,
      totalItems,
      totalPrice,
      addToCart,
      setQuantity,
      incrementItem,
      decrementItem,
      removeItem,
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider

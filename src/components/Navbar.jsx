import { NavLink } from 'react-router-dom'
import useCart from '../context/useCart'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="navbar">
      <h1 className="brand">MarketSpace</h1>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
          Shop
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cart {totalItems > 0 ? `(${totalItems})` : ''}
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar

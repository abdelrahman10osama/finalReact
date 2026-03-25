import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import CartProvider from './context/CartProvider'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App

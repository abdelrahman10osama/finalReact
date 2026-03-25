import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="home-page">
      <div className="hero-panel">
        <p className="eyebrow">Spring Collection</p>
        <h2>Find everyday items you will actually use.</h2>
        <p>
          Browse curated products, fine-tune quantities, and manage your cart with a simple shopping flow.
        </p>
        <Link to="/shop" className="primary-button inline-button">
          Start Shopping
        </Link>
      </div>

      <div className="home-grid">
        <article>
          <h3>Fast browsing</h3>
          <p>Products are fetched from FakeStore API and displayed with clear card layouts.</p>
        </article>
        <article>
          <h3>Easy quantity edits</h3>
          <p>Adjust quantities with plus/minus controls or type exact values manually.</p>
        </article>
        <article>
          <h3>Live cart updates</h3>
          <p>The navbar cart badge updates in real time while you add or remove items.</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage

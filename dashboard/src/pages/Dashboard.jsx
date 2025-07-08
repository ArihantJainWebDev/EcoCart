import React from 'react'
import '../styles/Dashboard.css'

const Dashboard = () => {
    return (
        <>
            <main className="main-content">
                <section className="welcome-section">
                    <h1 className="welcome-title">Welcome back, Eco Warrior 🌱</h1>
                    <p className="welcome-subtitle">
                        Keep making a positive impact on our planet, one purchase at a time!
                    </p>
                </section>

                <div className="dashboard-grid">
                    <section className="card">
                        <h2 className="card-title">📈 Your Eco Impact</h2>
                        <div className="eco-stats">
                            <div className="stat-item">
                                <div className="stat-icon">🌿</div>
                                <div className="stat-value">12.5 kg</div>
                                <div className="stat-label">Carbon Saved</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">♻️</div>
                                <div className="stat-value">34 bottles</div>
                                <div className="stat-label">Plastic Avoided</div>
                            </div>
                        </div>
                    </section>

                    <section className="card">
                        <h2 className="card-title">🔍 Quick Actions</h2>
                        <div className="eco-stats">
                            <div className="stat-item">
                                <div className="stat-icon">🔍</div>
                                <div className="stat-value">View products</div>
                                <div className="stat-label">with best eco-scores</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">📊</div>
                                <div className="stat-value">Compare product's</div>
                                <div className="stat-label">eco-scores easily</div>
                            </div>
                        </div>
                    </section>

                    <section className="card products-section">
                        <h2 className="card-title">🔃 Recently Scanned Products</h2>
                        <div className="products-list">
                            <div className="product-item">
                                <div className="product-info">
                                    <div className="product-name">Organic Cotton T-Shirt</div>
                                    <div className="product-category">Clothing</div>
                                </div>
                                <div className="product-score">
                                    <div className="eco-score">9/10</div>
                                    <span className="score-badge score-high">high</span>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-info">
                                    <div className="product-name">Bamboo Toothbrush Set</div>
                                    <div className="product-category">Personal Care</div>
                                </div>
                                <div className="product-score">
                                    <div className="eco-score">8/10</div>
                                    <span className="score-badge score-high">high</span>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-info">
                                    <div className="product-name">Recycled Paper Notebook</div>
                                    <div className="product-category">Office Supplies</div>
                                </div>
                                <div className="product-score">
                                    <div className="eco-score">7/10</div>
                                    <span className="score-badge score-medium">medium</span>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-info">
                                    <div className="product-name">Conventional Plastic Bottle</div>
                                    <div className="product-category">Beverages</div>
                                </div>
                                <div className="product-score">
                                    <div className="eco-score">3/10</div>
                                    <span className="score-badge score-low">low</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Dashboard

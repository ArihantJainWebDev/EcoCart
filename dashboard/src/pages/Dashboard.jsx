import React from 'react';
import '../styles/dashboard.css';
import Navbar from '../components/Navbar';

const Dashboard = () => {

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome back, Eco Warrior 🌱</h1>
          <p className="welcome-subtitle">
            Keep making a positive impact on our planet, one purchase at a time!
          </p>
        </section>
        <section className='redeem-section'>
          <h2 className="redeem-title">🎁 Redeem Your Eco Points</h2>
          <p className="redeem-description">
            You have <strong>69 Eco Points</strong> available. Redeem them for eco-friendly products and rewards!
          </p>
          <a href="/redeem" className="redeem-button">Redeem Now</a>
        </section>

        <div className="dashboard-grid">
          <section className="card">
            <h2 className="card-title">📈 Your Eco Impact</h2>
            <div className="eco-stats">
              <div className="stat-item">
                <div className="stat-icon">🌿</div>
                <div className="stat-value">343</div>
                <div className="stat-label">Total Eco Score</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">💰</div>
                <div className="stat-value">69</div>
                <div className="stat-label">Total Points</div>
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
                <div className="stat-value">Compare products</div>
                <div className="stat-label">eco-scores easily</div>
              </div>
            </div>
          </section>

          <section className="card products-section">
            <h2 className="card-title">🔃 Recently Scanned Products</h2>
            <div className="products-list">
              <div className="product-item">
                <div className="product-image">
                  <div className="product-info">
                    <h3 className="product-title">Eco-Friendly Shampoo</h3>
                    <p className="product-score">Eco Score: 85</p>
                    <p className="product-reward">Reward: 17 points</p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <div className="product-info">
                  <h3 className="product-title">Biodegradable Soap</h3>
                  <p className="product-score">Eco Score: 90</p>
                  <p className="product-reward">Reward: 18 points</p>
                </div>
              </div>
              <div className="product-item">
                <div className="product-info">
                  <h3 className="product-title">Sustainable Toothbrush</h3>
                  <p className="product-score">Eco Score: 80</p>
                  <p className="product-reward">Reward: 16 points</p>
                </div>
              </div>
              <div className="product-item">
                <div className="product-info">
                  <h3 className="product-title">Organic Cotton T-Shirt</h3>
                  <p className="product-score">Eco Score: 88</p>
                  <p className="product-reward">Reward: 18 points</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;

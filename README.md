# ♻️ EcoCart Dashboard

Welcome to the **EcoCart Dashboard** — an eco-awareness dashboard that tracks your green shopping activity, displays your eco-score, and allows you to redeem eco-friendly rewards! Built with React.js.

---

## # Features

- View eco-score and scan history (Chrome Extension integration)
- Redeem eco-friendly rewards and digital vouchers
- Track total points and rewards earned
- Fully responsive UI with modern design
- Secure backend API (Node.js + MongoDB)

---

## 🌐 Live Services

- **Dashboard**: [EcoCart Dashboard (Deployed)](https://eco-cart-sand.vercel.app)
- **API Backend**: Deployed on Render (or your backend host)

You don't need to run the dashboard or backend locally — everything is already connected.

---

## # Project Structure

```bash
EcoCart/
├── extension/         # Chrome Extension (Vanilla JS, HTML, CSS)
├── dashboard/         # React.js Frontend (this repo)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/           # Express.js Backend
```

## # Tech Stack

**Frontend (Dashboard)**:
- React.js
- CSS
- React Router

**Extension**:
- HTML, CSS, JavaScript
- Chrome Storage API

**Backend**:
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT for authentication

**Deployement**:
- Render for backend
- vercel for dashboard 


---

## 🧪 How to Use Locally

1. **Download or Clone the Repo**

```bash
git clone https://github.com/ArihantJainWebDev/EcoCart.git
cd EcoCart/extension
```

- Load in Chrome
- Open Chrome and go to: chrome://extensions/
- Enable Developer mode (top-right)
- Click Load unpacked
- Select the extension/ folder

---

# Author
Made with 💚 by Arihant Jain

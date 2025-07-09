console.log("✅ EcoCart content script loaded:", window.location.href);

// Try common product title selectors
function extractProductTitle() {
  const selectors = ["#productTitle", ".product-title", "h1", ".title", ".UV.ZEz"];
  for (let sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim().length > 0) {
      return el.innerText.trim();
    }
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_PRODUCT") {
    const title = extractProductTitle();
    console.log("📦 Product title found:", title);

    if (title) {
      chrome.runtime.sendMessage({ action: "productScanned", title });
    } else {
      alert("❌ Product title not found.");
    }
  }

  if (request.action === "showEcoScore") {
    const { score, description } = request.ecoData;

    const existing = document.getElementById("eco-score-badge");
    if (existing) existing.remove();

    const badge = document.createElement("div");
    badge.id = "eco-score-badge";
    badge.innerHTML = `
      🌱 <strong>Eco Score:</strong> ${score} <br />
      <small>${description}</small>
    `;
    badge.style = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: #388e3c;
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      z-index: 9999;
      font-family: sans-serif;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(badge);
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, title } = message;

  // Handle productScanned
  if (action === "productScanned") {
    const productTitle = title;
    const normalized = (productTitle || "").trim().toLowerCase();

    console.log("🌿 Generating local eco score for:", productTitle);

    chrome.storage.local.get(["scannedProducts"], (result) => {
      let allProducts = result.scannedProducts || {};
      let ecoData = allProducts[normalized];

      // If not found, generate and store
      if (!ecoData) {
        ecoData = {
          title: productTitle,
          score: Math.floor(Math.random() * 30) + 60,
          carbon: (Math.random() * 3 + 0.5).toFixed(2) + " kg CO₂",
          plastic: Math.floor(Math.random() * 100 + 10) + "g",
          chemicals: ["Low", "Moderate", "High", "None"][Math.floor(Math.random() * 4)],
          date: new Date().toISOString(),
          reward: Math.floor(Math.random() * 5 + 3)
        };

        // Save locally
        allProducts[normalized] = ecoData;
        chrome.storage.local.set({ scannedProducts: allProducts });

        // 🔁 Send to Railway backend
        fetch("https://mongodb-production-8dd8.up.railway.app/api/scans/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ecoData)
        })
        .then(res => res.json())
        .then(data => console.log("📤 Sent to backend:", data))
        .catch(err => console.error("❌ Backend error:", err));
      }

      // Send data to content script
      if (sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "showEcoScore",
          ecoData,
          title: productTitle
        });
      }

      // Optional: send to popup
      chrome.runtime.sendMessage({
        action: "showEcoScore",
        ecoData,
        title: productTitle
      });

      sendResponse({ success: true, ecoData });
    });

    return true; // Keeps message channel open
  }

  // Handle dashboard's request
  if (action === "getScannedProducts") {
    chrome.storage.local.get(["scannedProducts"], (result) => {
      sendResponse({ data: result.scannedProducts || {} });
    });

    return true; // Required for async response
  }
});
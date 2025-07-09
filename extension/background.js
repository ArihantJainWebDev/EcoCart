chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "productScanned") {
    const productTitle = message.title;
    console.log("🌐 Fetching eco score for:", productTitle);

    fetch(`http://localhost:5000/api/ecoscore?title=${encodeURIComponent(productTitle)}`)
      .then(res => res.json())
      .then(ecoData => {
        console.log("✅ Eco data:", ecoData);

        // Send to content script (for badge)
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "showEcoScore",
          ecoData
        });

        // Send to popup (for UI)
        chrome.runtime.sendMessage({
          action: "showEcoScore",
          ecoData,
          title: productTitle
        });
      })
      .catch(err => {
        console.error("❌ Error fetching eco score:", err);
      });
  }
});
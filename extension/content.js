console.log("EcoCart content script loaded:", window.location.href);

function extractProductTitle() {
  const selectors = ["#productTitle", ".product-title", "h1", ".title"];
  for (let sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim()) {
      return el.innerText.trim();
    }
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_PRODUCT") {
    const title = extractProductTitle();
    if (title) {
      console.log("Product title found:", title);
      chrome.runtime.sendMessage({ action: "productScanned", title });
    } else {
      alert("Could not detect product title.");
    }
  }
  sendResponse({ status: "scanned" });
});
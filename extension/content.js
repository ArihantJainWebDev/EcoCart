chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_PRODUCT") {
    let title = "";

    // Try getting the product title from common shopping sites
    if (document.querySelector("#productTitle")) {
      title = document.querySelector("#productTitle").innerText.trim(); // Amazon
    } else if (document.querySelector("h1")) {
      title = document.querySelector("h1").innerText.trim(); // Fallback
    } else {
      title = document.title;
    }

    console.log("🔍 Detected title:", title);

    chrome.runtime.sendMessage({
      action: "productScanned",
      title
    }, (response) => {
      console.log("✅ Scan complete:", response);
    });

    sendResponse({ status: "ok", title });
  }
});
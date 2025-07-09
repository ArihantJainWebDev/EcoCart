chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_PRODUCT") {
    let title = "";

    if (document.querySelector("#productTitle")) {
      title = document.querySelector("#productTitle").innerText.trim();
    } else if (document.querySelector("h1")) {
      title = document.querySelector("h1").innerText.trim();
    } else {
      title = document.title;
    }

    console.log("Detected title:", title);

    chrome.runtime.sendMessage({
      action: "productScanned",
      title
    }, (response) => {
      console.log("Scan complete:", response);
    });

    sendResponse({ status: "ok", title });
  }
});
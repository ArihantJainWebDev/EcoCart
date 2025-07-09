document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.querySelector(".scan-btn");
  const dashboardBtn = document.querySelector(".dashboard-btn");

  const itemCount = document.getElementById("item-count");
  const ecoScore = document.getElementById("eco-score");
  const ecoReward = document.getElementById("eco-reward");
  const achievementBox = document.getElementById("achievement-box");

  const productNameEl = document.getElementById("product-name");
  const carbonEl = document.getElementById("carbon-footprint");
  const plasticEl = document.getElementById("plastic-used");
  const chemicalEl = document.getElementById("chemicals");

  function setAchievement(score, count) {
    if (score >= 80 && count >= 5) {
      achievementBox.innerText = "🏆 Eco Warrior + Cart Master!";
    } else if (score >= 80) {
      achievementBox.innerText = "🏆 Eco Warrior!";
    } else if (count >= 5) {
      achievementBox.innerText = "🎯 First Cart Scan!";
    } else {
      achievementBox.innerText = "✨ Keep scanning to earn rewards!";
    }
  }

  function randomCarbon() {
    return (Math.random() * 3 + 0.5).toFixed(2) + " kg CO₂";
  }

  function randomPlastic() {
    return Math.floor(Math.random() * 100 + 10) + "g";
  }

  function randomChemicals() {
    const options = ["Low", "Moderate", "High", "None"];
    return options[Math.floor(Math.random() * options.length)];
  }

  function normalizeTitle(title) {
    return (title || "").trim().toLowerCase();
  }

  function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMsg = document.getElementById("alert-message");
    const alertBtn = document.getElementById("alert-ok-btn");

    alertMsg.textContent = message;
    alertBox.classList.remove("hidden");

    alertBtn.onclick = () => {
      alertBox.classList.add("hidden");
    };
  }

  function updateUI(data, isAlreadyScanned = false) {
    const { title, score, carbon, plastic, chemicals } = data;

    let numericScore = parseInt(score);
    if (isNaN(numericScore)) numericScore = Math.floor(Math.random() * 35) + 50;
    else numericScore = Math.max(40, Math.min(100, numericScore));

    let storage = JSON.parse(localStorage.getItem("ecoCartData")) || {
      count: 0,
      scannedTitles: [],
      totalReward: 0
    };

    const normalizedTitle = normalizeTitle(title);
    const alreadyScanned = storage.scannedTitles.includes(normalizedTitle);
    const reward = Math.floor(numericScore / 10);

    if (!alreadyScanned && !isAlreadyScanned) {
      storage.count += 1;
      storage.scannedTitles.push(normalizedTitle);
      storage.totalReward += reward;
    } else {
      showAlert("✅ This product has already been scanned before!");
    }

    storage.lastScore = numericScore;
    localStorage.setItem("ecoCartData", JSON.stringify(storage));

    itemCount.textContent = storage.count;
    ecoScore.textContent = numericScore;
    ecoReward.textContent = storage.totalReward;

    productNameEl.textContent = title || "Unknown Product";
    carbonEl.textContent = carbon;
    plasticEl.textContent = plastic;
    chemicalEl.textContent = chemicals;

    setAchievement(numericScore, storage.count);
  }

  const saved = JSON.parse(localStorage.getItem("ecoCartData"));
  if (saved) {
    itemCount.textContent = saved.count || 0;
    ecoReward.textContent = saved.totalReward || 0;
    ecoScore.textContent = saved.lastScore || "--";
  }

  function getOrGenerateEcoData(title, input = {}) {
    const normalized = normalizeTitle(title);
    let allProducts = JSON.parse(localStorage.getItem("scannedProducts")) || {};

    if (allProducts[normalized]) {
      return { ...allProducts[normalized], title };
    }

    const newData = {
      title,
      score: parseInt(input.score) || Math.floor(Math.random() * 30) + 60,
      carbon: input.carbon || randomCarbon(),
      plastic: input.plastic || randomPlastic(),
      chemicals: input.chemicals || randomChemicals()
    };

    allProducts[normalized] = newData;
    localStorage.setItem("scannedProducts", JSON.stringify(allProducts));
    return newData;
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "showEcoScore") {
      const { ecoData, title } = msg;

      const usedTitle = title || ecoData.title || "Unknown Product";
      const normalizedTitle = normalizeTitle(usedTitle);
      const scannedTitles = JSON.parse(localStorage.getItem("ecoCartData"))?.scannedTitles || [];
      const alreadyScanned = scannedTitles.includes(normalizedTitle);

      const finalData = getOrGenerateEcoData(usedTitle, ecoData);
      updateUI(finalData, alreadyScanned);

      sendResponse({ status: "UI updated" });
    }
    return true; // 👈 Keep this to allow async sendResponse
  });

  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs.length) {
          alert("No active tab found");
          return;
        }

        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "SCAN_PRODUCT" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("❌ Content script error:", chrome.runtime.lastError.message);
              alert("⚠️ Cannot scan this page. Try a shopping product page instead.");
            } else {
              console.log("✅ Scan request sent");
            }
          }
        );
      });
    });
  }

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      window.open("http://localhost:5173/", "_blank");
    });
  }
});
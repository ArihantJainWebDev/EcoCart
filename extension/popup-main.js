document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.querySelector(".scan-btn");
  const dashboardBtn = document.querySelector(".dashboard-btn");

  const itemCount = document.getElementById("item-count");
  const ecoScore = document.getElementById("eco-score");
  const ecoReward = document.getElementById("eco-reward");
  const achievementBox = document.getElementById("achievement-box");

  const productNameEl = document.getElementById("product-name");
  const ecoGradeEl = document.getElementById("eco-grade");
  const carbonEl = document.getElementById("carbon-footprint");
  const plasticEl = document.getElementById("plastic-used");
  const chemicalEl = document.getElementById("chemicals");

  function convertGradeToScore(letter) {
    switch ((letter || "").toUpperCase()) {
      case "A": return 90;
      case "B": return 80;
      case "C": return 70;
      case "D": return 60;
      case "E": return 50;
      default: return 40;
    }
  }

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

  function updateUI(data) {
    const { title, score, description } = data;
    const grade = score.toUpperCase();
    const numericScore = convertGradeToScore(grade);

    let storage = JSON.parse(localStorage.getItem("ecoCartData")) || {
      count: 0,
      scannedTitles: [],
      totalReward: 0
    };

    // Prevent duplicate count for the same product
    if (!storage.scannedTitles.includes(title)) {
      storage.count += 1;
      storage.scannedTitles.push(title);
    }

    const reward = Math.floor(numericScore / 10);
    storage.totalReward += reward;
    storage.lastScore = numericScore;

    localStorage.setItem("ecoCartData", JSON.stringify(storage));

    // Update UI
    itemCount.textContent = storage.count;
    ecoScore.textContent = numericScore;
    ecoReward.textContent = storage.totalReward;

    productNameEl.textContent = title || "Unknown Product";
    ecoGradeEl.textContent = grade;
    carbonEl.textContent = randomCarbon();
    plasticEl.textContent = randomPlastic();
    chemicalEl.textContent = randomChemicals();

    setAchievement(numericScore, storage.count);
  }

  // 🧠 Restore on load
  const saved = JSON.parse(localStorage.getItem("ecoCartData"));
  if (saved) {
    itemCount.textContent = saved.count || 0;
    ecoReward.textContent = saved.totalReward || 0;
    ecoScore.textContent = saved.lastScore || "--";
  }

  // 📩 Listen for score from background
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "showEcoScore") {
      const { ecoData, title } = msg;
      updateUI({
        title: title || "Unknown Product",
        score: ecoData.score,
        description: ecoData.description
      });
    }
  });

  // 🔄 Trigger scan
  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "SCAN_PRODUCT" });
      });
    });
  }

  // 📊 Open full dashboard
  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      window.open("http://localhost:5173/", "_blank");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.querySelector(".scan-btn");
  const dashboardBtn = document.querySelector(".dashboard-btn");
  const itemCount = document.getElementById("item-count");
  const ecoScore = document.getElementById("eco-score");
  const achievementBox = document.getElementById("achievement-box");

  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      const count = Math.floor(Math.random() * 10) + 1;
      const score = Math.floor(Math.random() * 100) + 1;

      itemCount.textContent = count;
      ecoScore.textContent = score;

      if (score >= 80) {
        achievementBox.innerText = "🏆 Achievement: Eco Warrior Unlocked!";
      } else if (count >= 5) {
        achievementBox.innerText = "🎯 Achievement: First Cart Scan!";
      } else {
        achievementBox.innerText = "✨ Keep scanning to earn rewards!";
      }
    });
  }

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      window.open("http://localhost:5173/", "_blank");
    });
  }
});

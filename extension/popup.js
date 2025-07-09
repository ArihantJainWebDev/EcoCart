document.getElementById('start-btn').addEventListener('click', async () => {
  chrome.storage.local.get(['token'], (result) => {
    if (result.token) {
      window.location.href = "popup-main.html";
    } else {
      window.location.href = "popup-login.html";
    }
  });
});
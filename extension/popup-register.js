document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      chrome.storage.local.set({ token: data.token }, () => {
        window.location.href = 'popup-main.html';
      });
    } else {
      document.getElementById('register-status').innerText = '❌ ' + (data.error || 'Signup failed');
    }
  } catch (err) {
    document.getElementById('register-status').innerText = '❌ Network error';
  }
});
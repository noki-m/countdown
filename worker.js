self.addEventListener('message', function(e) {
  let targetDate = new Date(e.data);
  setInterval(() => {
    const now = new Date();
    const timeLeft = Math.floor((targetDate - now) / 1000);
    self.postMessage(timeLeft);
  }, 1000);
});

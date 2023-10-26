let countdown;

function initializeCountdown() {
  setDefaultTime();
  startCountdown();

  document.getElementById("targetDate").addEventListener("input", function () {
    if (this.value.length >= 4) {
      startCountdown();
    }
  });

  document.querySelectorAll('input[name="format"]').forEach(button => {
    button.addEventListener("change", function () {
      startCountdown();
    });
  });
}

function setDefaultTime() {
  document.getElementById("targetDate").value = "2359";  // 2359を設定
}

window.addEventListener("load", initializeCountdown);
const worker = new Worker('worker.js');
// Web Workerからのメッセージを受信
worker.addEventListener('message', function(e) {
  const timeLeft = e.data;

});

function startCountdown() {
  if (countdown) {
    clearInterval(countdown);
  }
  const selectedFormat = document.querySelector('input[name="format"]:checked').value;
  const now = new Date();
  const input = document.getElementById("targetDate").value;
  const targetDate = new Date(now);
  targetDate.setHours(parseInt(input.substring(0, 2)));
  targetDate.setMinutes(parseInt(input.substring(2, 4)));
  targetDate.setSeconds(0);


  // 目標時刻の表示
  const targetTimeStr = `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日 ${targetDate.getHours()}時${targetDate.getMinutes()}分`;
  document.getElementById("preText").textContent = `${targetTimeStr}まであと`;

  countdown = setInterval(() => {
    const now = new Date();
    let timeLeft = Math.floor((targetDate - now) / 1000);
    let displayTime;

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (selectedFormat === "hhmm") {
      displayTime = `${hours}時間${minutes}分`;
    } else if (selectedFormat === "DDhhmm") {
      const days = Math.floor(timeLeft / 86400);
      displayTime = `${days}日${hours}時間${minutes}分`;
    } else if (selectedFormat === "seconds") {
      displayTime = `${timeLeft}秒`;
    } else if (selectedFormat === "hhmmss") {
      displayTime = `${hours}時間${minutes}分${seconds}秒`;
    }

    if (timeLeft <= 0) {
      clearInterval(countdown);
      displayTime = "時間切れ";
    }

    document.getElementById("timeLeft").textContent = displayTime;
  }, 1000);
}
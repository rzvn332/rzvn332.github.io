# ⏰ Real-Time Clock  
🕒 Current time: **<span id="live-clock"></span>**  

🌐 **My Portfolio:** [rzvn332.github.io/portfolio](https://rzvn332.github.io/portfolio)  

<script>
  // Auto-updating clock
  function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock(); // Run immediately
</script>

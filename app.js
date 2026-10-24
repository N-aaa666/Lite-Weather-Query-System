console.log("✅ 轻简天气动态系统加载完成");

let size = 16;
const fontSizeBox = document.createElement('div');
fontSizeBox.style.cssText = `position:fixed;bottom:90px;right:20px;z-index:99;display:flex;gap:4px;`;
fontSizeBox.innerHTML = `
  <button id="smallFont" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.3);color:#fff;cursor:pointer;">A-</button>
  <button id="bigFont" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.3);color:#fff;cursor:pointer;">A+</button>
`;
document.body.appendChild(fontSizeBox);

document.getElementById('smallFont').onclick = () => {
  size = Math.max(12, size - 1);
  document.documentElement.style.fontSize = size + "px";
};
document.getElementById('bigFont').onclick = () => {
  size = Math.min(24, size + 1);
  document.documentElement.style.fontSize = size + "px";
};

// ==============================================
// 天气数据
// ==============================================
const weatherData = {
  "北京市": {
    temp: "28", weather: "晴", icon: "sunny.png",
    low: "20", high: "33", hum: "38", air: "优", wind: "2级北风",
    week: [
      { day: "周一", weather: "晴", icon: "sunny.png", temp: "20~33°" },
      { day: "周二", weather: "多云", icon: "cloudy.png", temp: "21~30°" },
      { day: "周三", weather: "多云", icon: "cloudy.png", temp: "22~29°" },
      { day: "周四", weather: "晴", icon: "sunny.png", temp: "20~31°" },
      { day: "周五", weather: "晴", icon: "sunny.png", temp: "19~30°" },
      { day: "周六", weather: "多云", icon: "cloudy.png", temp: "18~27°" },
      { day: "周日", weather: "小雨", icon: "rain.png", temp: "16~24°" }
    ]
  },
  "上海市": {
    temp: "25", weather: "多云", icon: "cloudy.png",
    low: "21", high: "29", hum: "55", air: "良", wind: "3级南风",
    week: [
      { day: "周一", weather: "多云", icon: "cloudy.png", temp: "21~29°" },
      { day: "周二", weather: "小雨", icon: "rain.png", temp: "19~26°" },
      { day: "周三", weather: "小雨", icon: "rain.png", temp: "18~24°" },
      { day: "周四", weather: "阴", icon: "cloudy.png", temp: "20~25°" },
      { day: "周五", weather: "多云", icon: "cloudy.png", temp: "22~28°" },
      { day: "周六", weather: "晴", icon: "sunny.png", temp: "23~30°" },
      { day: "周日", weather: "晴", icon: "sunny.png", temp: "24~31°" }
    ]
  },
  "广州市": {
    temp: "35", weather: "多云", icon: "cloudy.png",
    low: "26", high: "36", hum: "49", air: "良", wind: "3级南风",
    week: [
      { day: "周一", weather: "多云", icon: "cloudy.png", temp: "26~36°" },
      { day: "周二", weather: "小雨", icon: "rain.png", temp: "25~32°" },
      { day: "周三", weather: "晴", icon: "sunny.png", temp: "27~35°" },
      { day: "周四", weather: "多云", icon: "cloudy.png", temp: "26~34°" },
      { day: "周五", weather: "中雨", icon: "rain.png", temp: "24~30°" },
      { day: "周六", weather: "阴", icon: "cloudy.png", temp: "23~29°" },
      { day: "周日", weather: "晴", icon: "sunny.png", temp: "25~33°" }
    ]
  },
  "襄阳市": {
    temp: "22", weather: "小雨", icon: "rain.png",
    low: "18", high: "25", hum: "62", air: "良", wind: "3级东风",
    week: [
      { day: "周一", weather: "小雨", icon: "rain.png", temp: "18~25°" },
      { day: "周二", weather: "阴", icon: "cloudy.png", temp: "17~23°" },
      { day: "周三", weather: "多云", icon: "cloudy.png", temp: "19~26°" },
      { day: "周四", weather: "晴", icon: "sunny.png", temp: "20~28°" },
      { day: "周五", weather: "晴", icon: "sunny.png", temp: "21~29°" },
      { day: "周六", weather: "多云", icon: "cloudy.png", temp: "20~27°" },
      { day: "周日", weather: "小雨", icon: "rain.png", temp: "18~24°" }
    ]
  }
};

// ==============================================
// 搜索功能
// ==============================================
const searchBtn = document.querySelector('.search button');
const searchInput = document.querySelector('.search input');
const locationEl = document.querySelector('.location');
const tempEl = document.querySelector('.temp');
const weatherIconEl = document.querySelector('.weather img');
const weatherTextEl = document.querySelector('.weather .text');
const infoBox = document.querySelector('.info');
const weekContainer = document.querySelector('.week');

function loadCity(city) {
  let data = weatherData[city];
  if (!data) return;

  locationEl.innerText = city;
  tempEl.innerText = data.temp + "°";
  weatherTextEl.innerText = data.weather;
  weatherIconEl.src = "images/" + data.icon;

  infoBox.innerHTML = `
    <div>温度 ${data.low}~${data.high}°</div>
    <div>湿度 ${data.hum}%</div>
    <div>空气质量 ${data.air}</div>
    <div>风速 ${data.wind}</div>
  `;

  if (weekContainer) {
    weekContainer.innerHTML = "";
    data.week.slice(0, 3).forEach(day => {
      weekContainer.innerHTML += `
        <div class="week-item">
          <div>${day.day}</div>
          <img src="images/${day.icon}" class="weather-icon" alt="">
          <div>${day.weather}</div>
          <div>${day.temp}</div>
        </div>`;
    });
    bindWeekClick();
  }
}

function bindWeekClick() {
  const weekItems = document.querySelectorAll('.week-item');
  weekItems.forEach(item => {
    item.addEventListener('click', () => {
      weekItems.forEach(i => i.style.background = "rgba(255,255,255,0.2)");
      item.style.background = "rgba(255,255,255,0.5)";
    });
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    let city = searchInput.value.trim();
    if (!city) {
      alert("请输入城市名称！");
      return;
    }
    if (weatherData[city]) {
      loadCity(city);
    } else {
      alert("支持城市：北京市、上海市、广州市、襄阳市");
    }
  });
}

// ==============================================
// 返回顶部
// ==============================================
const backTop = document.createElement('div');
backTop.innerText = "↑";
backTop.style.cssText = `
  position:fixed;bottom:30px;right:20px;width:45px;height:45px;
  background:#4F9FFF;color:white;border-radius:50%;text-align:center;
  line-height:45px;font-size:20px;cursor:pointer;display:none;z-index:99;
  transition:all 0.3s ease;box-shadow:0 3px 10px rgba(0,0,0,0.2);
`;
document.body.appendChild(backTop);
window.addEventListener('scroll', () => {
  backTop.style.display = window.scrollY > 100 ? "block" : "none";
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==============================================
// 昼夜模式
// ==============================================
const themeBtn = document.createElement('button');
themeBtn.innerText = "昼夜模式";
themeBtn.style.cssText = `
  position:fixed;top:20px;right:20px;padding:6px 12px;
  border-radius:15px;border:none;background:rgba(255,255,255,0.3);
  color:#fff;cursor:pointer;z-index:99;transition:all 0.3s ease;
`;
document.body.appendChild(themeBtn);
let dark = false;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  if (dark) {
    document.body.style.background = "#101a33";
    const card = document.querySelector('.card');
    if (card) card.style.background = "rgba(0,15,50,0.55)";
  } else {
    document.body.style.background = "";
    const card = document.querySelector('.card');
    if (card) card.style.background = "rgba(255,255,255,0.25)";
  }
});

// ==============================================
// 重置城市
// ==============================================
const resetBtn = document.createElement('button');
resetBtn.innerText = "重置城市";
resetBtn.style.cssText = `
  position:fixed;top:60px;right:20px;padding:6px 12px;
  border-radius:15px;border:none;background:rgba(255,255,255,0.3);
  color:#fff;cursor:pointer;z-index:99;transition:all 0.3s ease;
`;
document.body.appendChild(resetBtn);
resetBtn.addEventListener('click', () => {
  if (searchInput) searchInput.value = "";
  loadCity("襄阳市");
  alert("已重置为襄阳市");
});

// ==============================================
// 页面加载默认城市
// ==============================================
if (locationEl) {
  window.onload = () => {
    loadCity("襄阳市");
    bindWeekClick();
  };
}
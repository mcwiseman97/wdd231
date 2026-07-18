// Add your free OpenWeatherMap API key: https://openweathermap.org/api
const WEATHER_API_KEY = '64edd624f7a9329aef1efcf4f8774105';
const LAT = 32.3865;
const LON = -96.8483;
const MEMBERS_URL = 'scripts/members.json';

const weatherCurrent = document.querySelector('#weather-current');
const weatherForecast = document.querySelector('#weather-forecast');
const spotlightsContainer = document.querySelector('#spotlights');

async function getWeather() {
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
    weatherCurrent.innerHTML = '<p>Add the OpenWeatherMap API key in <code>scripts/index.js</code> to load weather data.</p>';
    return;
  }

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Weather API request failed');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    weatherCurrent.innerHTML = '<p>Unable to load weather data right now.</p>';
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherCurrent.innerHTML = `
    <img src="${iconUrl}" alt="${description}" width="80" height="80">
    <div>
      <p class="weather-temp">${temp}&deg;F</p>
      <p class="weather-desc">${description}</p>
    </div>
  `;
}

function displayForecast(data) {
  // OpenWeatherMap forecast returns 3-hour blocks; pick one reading per day near midday
  const daily = [];
  const seenDates = new Set();

  for (const entry of data.list) {
    const date = new Date(entry.dt * 1000);
    const dateKey = date.toDateString();
    const hour = date.getHours();

    if (!seenDates.has(dateKey) && hour >= 11 && hour <= 14) {
      seenDates.add(dateKey);
      daily.push(entry);
    }

    if (daily.length === 3) {
      break;
    }
  }

  // Fallback if midday slots are missing
  if (daily.length < 3) {
    daily.length = 0;
    seenDates.clear();
    for (const entry of data.list) {
      const dateKey = new Date(entry.dt * 1000).toDateString();
      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        daily.push(entry);
      }
      if (daily.length === 3) {
        break;
      }
    }
  }

  weatherForecast.innerHTML = daily.map((day) => {
    const date = new Date(day.dt * 1000);
    const label = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const temp = Math.round(day.main.temp);
    const description = day.weather[0].description;

    return `
      <div class="forecast-day">
        <p class="forecast-label">${label}</p>
        <p class="forecast-temp">${temp}&deg;F</p>
        <p class="forecast-desc">${description}</p>
      </div>
    `;
  }).join('');
}

async function getSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    const eligible = data.businesses.filter((business) => {
      const level = business.membershiplevel.toLowerCase();
      return level === 'gold' || level === 'silver';
    });

    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffle(eligible).slice(0, Math.min(count, eligible.length));
    displaySpotlights(selected);
  } catch (error) {
    console.error('Failed to fetch spotlights:', error);
    spotlightsContainer.innerHTML = '<p>Unable to load company spotlights.</p>';
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(businesses) {
  spotlightsContainer.innerHTML = '';

  businesses.forEach((business) => {
    const card = document.createElement('section');
    card.className = 'spotlight-card';

    card.innerHTML = `
      <img src="${business.imageurl}" alt="Logo of ${business.businessname}" loading="lazy" width="120" height="120">
      <h4>${business.businessname}</h4>
      <p class="membership-level">${business.membershiplevel} Member</p>
      <p>${business.phone}</p>
      <p>${business.address}</p>
      <p><a href="${business.website}" target="_blank" rel="noopener noreferrer">${business.website}</a></p>
    `;

    spotlightsContainer.appendChild(card);
  });
}

getWeather();
getSpotlights();

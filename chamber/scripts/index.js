const WEATHER_API_KEY = '64edd624f7a9329aef1efcf4f8774105';
const LAT = 32.3865;
const LON = -96.8483;
const MEMBERS_URL = 'scripts/members.json';

const weatherCurrent = document.querySelector('#weather-current');
const weatherForecast = document.querySelector('#weather-forecast');
const spotlightsContainer = document.querySelector('#spotlights');

async function getWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`;

  try {
    const currentResponse = await fetch(currentUrl);
    const forecastResponse = await fetch(forecastUrl);
    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error('Failed to fetch weather:', error);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  weatherCurrent.innerHTML = `
    <p class="weather-temp">${temp}&deg;F</p>
    <p class="weather-desc">${description}</p>
  `;
}

function displayForecast(data) {
  // Forecast data comes in 3-hour blocks; take one entry per day for 3 days
  const daily = [];
  const seenDates = new Set();

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

  weatherForecast.innerHTML = '';

  daily.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const label = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    const temp = Math.round(day.main.temp);
    const description = day.weather[0].description;

    weatherForecast.innerHTML += `
      <div class="forecast-day">
        <p class="forecast-label">${label}</p>
        <p class="forecast-temp">${temp}&deg;F</p>
        <p class="forecast-desc">${description}</p>
      </div>
    `;
  });
}

async function getSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);
    const data = await response.json();

    const eligible = data.businesses.filter((business) => {
      const level = business.membershiplevel.toLowerCase();
      return level === 'gold' || level === 'silver';
    });

    // Randomly show 2 or 3 gold/silver members
    const count = Math.floor(Math.random() * 2) + 2;
    const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, count);

    displaySpotlights(selected);
  } catch (error) {
    console.error('Failed to fetch spotlights:', error);
  }
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
      <p><a href="${business.website}">${business.website}</a></p>
    `;

    spotlightsContainer.appendChild(card);
  });
}

getWeather();
getSpotlights();

async function fetchWeather() {
    const searchInput = document.getElementById('search').value;
    const weatherDataSection = document.getElementById('weather-data');
    weatherDataSection.style.display = 'flex'; 
    
    const apiKey = "ENTER API KEY"; 
  
    
    if (searchInput == "") {
      weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    }
  
    // Define function to get longitude and latitude
    async function getLonAndLat() {
      const countryCode = 1; 
      const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
  
      const response = await fetch(geocodeURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
  
      const data = await response.json();
  
      if (data.length == 0) {
        console.log("Something went wrong here.");
        weatherDataSection.innerHTML = `
        <div>
          <h2>Invalid Input: "${searchInput}"</h2>
          <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
        return;
      } else {
        return data[0];
      }
    }
  
    // function to get weather data
    async function getWeatherData(lon, lat) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      const response = await fetch(weatherURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
  
      const data = await response.json();
  
      // Display weather data
      weatherDataSection.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100px" height="100px"/>
      <div>
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
      </div>
      `;
    }
  
    // Clear search input
    document.getElementById("search").value = "";
  
    // Get longitude and latitude
    const geocodeData = await getLonAndLat();
  
    // Get weather data
    if (geocodeData) {
      getWeatherData(geocodeData.lon, geocodeData.lat);
    }
  }
  
  // Event listener for search button
  document.getElementById('search-button').addEventListener('click', fetchWeather);
  

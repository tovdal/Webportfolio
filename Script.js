function fetchWeatherData() {
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "b4fdaca728b3f7626d89149777dc9c67";
  const city = "Sundsvall";
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

  const weatherInfo = document.getElementById("weatherInfo");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nätverksrespons var inte ok");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = Math.round(data.main.temp);
      const location = data.name;

      weatherInfo.innerHTML = `${location}: ${temperature}°C.`;
    })
    .catch((error) => {
      console.error("Det gick inte att hämta väderdata:", error);
    });
}

window.addEventListener("load", fetchWeatherData);

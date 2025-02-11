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
      const weatherCondition = data.weather[0].main;

      let weatherIcon = "";
      if (weatherCondition === "Clear") {
        weatherIcon = "☀️";
      } else if (weatherCondition === "Clouds") {
        weatherIcon = "☁️";
      } else if (weatherCondition === "Rain") {
        weatherIcon = "🌧️";
      } else if (weatherCondition === "Snow") {
        weatherIcon = "❄️";
      } else if (weatherCondition === "Thunderstorm") {
        weatherIcon = "⛈️";
      } else {
        weatherIcon = "🌫️";
      }

      weatherInfo.innerHTML = `${weatherIcon} ${location}: ${temperature}°C.`;
    })
    .catch((error) => {
      console.error("Det gick inte att hämta väderdata:", error);
    });
}

window.addEventListener("load", fetchWeatherData);

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset(); // Reset the form
          document.getElementById("thank-you-message").style.display = "block"; // Show the thank you message
        } else {
          response.json().then(function (data) {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch(function (error) {
        alert("Oops! There was a problem submitting your form");
      });
  });

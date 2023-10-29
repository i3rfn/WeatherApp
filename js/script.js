let submit = document.getElementById("submit");
let cityInput = document.getElementById("cityInput");
let cityOutput = document.getElementById("cityOutput");
let descOutput = document.getElementById("descOutput");
let tempOutput = document.getElementById("tempOutput");
let windOutput = document.getElementById("windOutput");
let humiOutput = document.getElementById("humiOutput");
const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
let imageStatus = document.getElementById("status");

function convertToCel(value) {
  return (value - 273.15).toFixed(0);
}

function display() {
  let showResult = document.getElementById("showResult");
  showResult.style.display = "block";
  cityOutput.style.display = "block";
}

async function getWeather() {
  try {
    if (cityInput.value === "") {
      alert("Please enter a city name.");
      return;
    } else {
      var weatherResult = await (
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
             ${cityInput.value}&appid=${apiKey}`)
      ).json();
    }
    display();
    setInfo(weatherResult);
    weatherStatus(weatherResult["weather"][0]["main"]);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function setInfo(data) {
  var cityName = data["name"];
  var description = data["weather"][0]["main"];
  var temp = data["main"]["temp"];
  var wind = data["wind"]["speed"];
  var humidity = data["main"]["humidity"];
  cityOutput.innerHTML = `${cityName}`;
  descOutput.innerHTML = `Description : ${description}`;
  tempOutput.innerHTML = `Temperature : ${convertToCel(temp)}°C`;
  windOutput.innerHTML = `Wind Speed : ${wind} KM/H`;
  humiOutput.innerHTML = `Humidity : ${humidity}%`;
}

function weatherStatus(data) {
  switch (data) {
    case "sunny":
    case "Clear":
      imageStatus.innerHTML = `<img src="./media/day.svg">`;
      break;
    case "Rain":
      imageStatus.innerHTML = `<img src="./media/rainy.svg">`;
      break;
    case "Haze":
      imageStatus.innerHTML = `<img src="./media/haze.svg">`;
      break;
    case "Clouds":
      imageStatus.innerHTML = `<img src="./media/cloudy.svg">`;
      break;
    case "Snow":
      imageStatus.innerHTML = `<img src="./media/snowy.svg">`;
      break;
    case "Fog":
      imageStatus.innerHTML = `<img src="./media/fog.svg">`;
      break;
    case "Night":
      imageStatus.innerHTML = `<img src="./media/night.svg">`;
      break;
    case "Thunder":
      imageStatus.innerHTML = `<img src="./media/thunder.svg">`;
      break;
    case "Mist":
      imageStatus.innerHTML = `<img src="./media/mist.svg">`;
      break;
    case "Dust":
      imageStatus.innerHTML = `<img src="./media/dust.svg">`;
      break;
    case "Hail":
      imageStatus.innerHTML = `<img src="./media/hail.svg">`;
      break;
    case "Hurricane":
      imageStatus.innerHTML = `<img src="./media/hurricane.svg">`;
      break;
  }
}

function keyPress() {
  if (event.which === 13) {
    getWeather();
    cityInput.value = "";
  }
}

cityInput.addEventListener("keypress", keyPress);
submit.addEventListener("click", function () {
  getWeather();
  cityInput.value = "";
});

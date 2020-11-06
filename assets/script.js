// checking to see wether or not anything been stored into local storage, if not creating a key named cities.
if (localStorage.getItem("cities") === null) {
  localStorage.setItem("cities", JSON.stringify([]));
}

// getting the cities array from local storage and looping through the array to add any values to the html that arent not currently displayed
function displayList() {
  const cities = JSON.parse(localStorage.getItem("cities"));
  let html = "";
  for (let i = 0; i < cities.length; i++) {
    html += `<li class="list-group-item">${cities[i]}</li>`;
    // html = html+ `<li class="list-group-item active">${cities[0]}</li>`;
  }
  // appending "searched Cities" to the html
  $("#searchedCities").html(html);
}
displayList();

// upon clicking the li elements display corresponding weather data
$("#searchedCities").on("click", "li", function (event) {
  event.stopPropagation();
  weatherLookUp($(this).text());
});

// getting the appropriate info from the API's to fill my html elements with
function weatherLookUp(cityName) {
  const APIkey = "da78f2587f0f29e343d3740e867a79e3";
  const queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey;
  // below is the 5 day api
  const queryFive =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(queryURL);
    $("#location").html(cityName);

    let kTemp = response.main.temp;
    let fTemp = Math.floor((kTemp - 273.15) * 1.8 + 32);
    $("#temp").html(fTemp);
    $("#temp1").html(fTemp);

    let hDity = response.main.humidity;
    $("#humidity").html(hDity);
    $("#humid1").html(hDity);

    let windSpeed = response.wind.speed;
    $("#windSpeed").html(windSpeed);

    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let queryUV =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIkey;

    $.ajax({
      url: queryUV,
      method: "GET",
    }).then(function (response) {
      let uvIdx = response.value;
      $("#uvIndex").html(uvIdx);
    });

    $.ajax({
      url: queryFive,
      method: "GET",
    }).then(function (response) {
      const forecasts = response.list;
      for (let i = 1; i < 5; i++) {
        let dayForecast = getDayForecast(forecasts, i);
        updateDay(dayForecast, i + 1);
      }
    });
  });
}

// upon clicking the search button taking the value of the input text
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  let cityText = $("#citySearch").val();
  const searchedCity = cityText.charAt(0).toUpperCase() + cityText.slice(1);
  // filling the html elements with info returned from the API based on what was searched
  weatherLookUp(searchedCity);
  // grabbing the key from local storage
  const savedCities = JSON.parse(localStorage.getItem("cities"));
  // checking to see if the value has been used before. If value been used before do nothing, if value is new
  if (savedCities.indexOf(searchedCity) == -1) {
    // push new value to the cities array
    savedCities.push(searchedCity);
    // update local storage
    localStorage.setItem("cities", JSON.stringify(savedCities));
    // displaying the new value in an new LI element
    displayList();
  }
});

function updateDay(forecast, dayNumber) {
  let dateData = moment(forecast.dt_txt).format("L");
  $("#day" + dayNumber).html(dateData);

  let kTemp = forecast.main.temp;
  let fTemp = Math.floor((kTemp - 273.15) * 1.8 + 32);
  $("#temp" + dayNumber).html(fTemp);

  let humidity = forecast.main.humidity;
  $("#humid" + dayNumber).html(humidity);
}

function getDayForecast(forecasts, nbrDaysAhead) {
  let day = moment().add(nbrDaysAhead, "days").format("YYYY-MM-DD");
  for (let i = 0; i < forecasts.length; i++) {
    let forecast = forecasts[i];
    let forecastDate = forecast.dt_txt;
    if (forecastDate.startsWith(day)) {
      return forecast;
    }
  }
  return forecasts[nbrDaysAhead];
}

// variables at the top
// funcitons

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

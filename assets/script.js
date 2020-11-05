if(localStorage.getItem('cities') === null){
    localStorage.setItem('cities', JSON.stringify([]));
}

function displayList(){
    const cities = JSON.parse(localStorage.getItem('cities'));
    let html = "";
    for(let i = 0; i < cities.length; i++){
        html+= `<li class="list-group-item">${cities[i]}</li>`;
        // html = html+ `<li class="list-group-item active">${cities[0]}</li>`;
    }

    $("#searchedCities").html(html);
}
displayList();

$("#searchedCities").on("click", "li", function(event){
    event.stopPropagation()
    console.log($(this).text());
    weatherLookUp($(this).text());
    
})

function weatherLookUp(cityName){
    const APIkey = "da78f2587f0f29e343d3740e867a79e3";
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    // below is the 5 day api
    const queryFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey; 
  

    $.ajax(
        {
            url: queryURL,
            method: "GET"
        })
        .then(function(response) 
        {
            
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
            let queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
            
            // update 2nd api url within first ajax call.
            // create a function for second and third ajax call 
            $.ajax(
                {
                    url: queryUV,
                    method: "GET"
                })
                .then(function(response){
                    let uvIdx = response.value;
                    $("#uvIndex").html(uvIdx);
                });
                
            $.ajax(
                {
                    url: queryFive,
                    method: "GET"
                })
                .then(function(response){
                    console.log(response);
                    const forecasts = response.list;
                    for(let i = 1; i < 5; i++){
                        let dayForecast = getDayForecast(forecasts, i);
                        updateDay(dayForecast, i + 1)
                    }
                });            
        });
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    const searchedCity = $("#citySearch").val();
    weatherLookUp(searchedCity);  
    const savedCities = JSON.parse(localStorage.getItem('cities'));
    if(savedCities.indexOf(searchedCity) == -1){
        savedCities.push(searchedCity);
        localStorage.setItem('cities', JSON.stringify(savedCities));
        displayList();
    }
});   
    
function updateDay(forecast, dayNumber) {
    // console.log(forecast + ',' + dayNumber);

    let dateData = moment(forecast.dt_txt).format('L');
    // console.log(dateData + ',' + dayNumber);
    // console.log(forecast.dt_txt);
    $("#day" + dayNumber).html(dateData);

    let kTemp = forecast.main.temp;
    let fTemp = Math.floor((kTemp - 273.15) * 1.8 + 32);
    $("#temp" + dayNumber).html(fTemp);

    let humidity = forecast.main.humidity;
    $("#humid" + dayNumber).html(humidity);                   
}

function getDayForecast(forecasts, nbrDaysAhead){
    let day = moment().add(nbrDaysAhead, 'days').format("YYYY-MM-DD");
    for(let i = 0; i < forecasts.length; i++){
        let forecast = forecasts[i];
        let forecastDate = forecast.dt_txt;
        if(forecastDate.startsWith(day)){
            return forecast;
        }
        
    }
    return forecasts[nbrDaysAhead];
}

// need to display last searched city upon opening page
// li elements are search history and only needs to display last searched city upon refresh
// li elements should display current weather and a 5 day forecast 

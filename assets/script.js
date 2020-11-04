$("#searchBtn").on("click", function(event) {

    event.preventDefault();

    let searchedCity = $("#citySearch").val();
    let APIkey = "da78f2587f0f29e343d3740e867a79e3";
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;
    // below is the 5 day api
    let queryFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + APIkey; 

    $.ajax(
        {
            url: queryURL,
            method: "GET"
        })
        .then(function(response) 
        {
            $("#location").html(searchedCity);

            let kTemp = response.main.temp;
            let fTemp = Math.floor((kTemp - 273.15) * 1.8 + 32);
            $("#temp").html(fTemp);

            let hDitty = response.main.humidity;
            $("#humidity").html(hDitty);

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
        });
});   
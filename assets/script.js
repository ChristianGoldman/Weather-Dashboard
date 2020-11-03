$("#searchBtn").on("click", function(event) {

    event.preventDefault();

    let searchedCity = $("#citySearch").val();
    let APIkey = "da78f2587f0f29e343d3740e867a79e3";
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;


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
        });
});

//http://localhost:52330/api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=da78f2587f0f29e343d3740e867a79e3
// http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=da78f2587f0f29e343d3740e867a79e3

// function myFunction(arg1, arg2) {
//     console.log('arg1:' + arg1 + ',arg2:' + arg2);
// }
// myFunction('a', 'b', 'c', 'd');
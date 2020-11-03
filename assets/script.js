$("#searchBtn").on("submit", function(event) {

    event.preventDefault();

    let searchedCity = $("#searchBtn").val();
    let APIkey = "da78f2587f0f29e343d3740e867a79e3";
    let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;

    $.ajax(
        {
            url: queryURL,
            method: "GET"
        })
        .then(function(response) 
        {
            console.log
});
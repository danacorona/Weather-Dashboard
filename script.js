$(document).ready(function() {
    // this is my api key
    var apiKey="3022b7a270f3e92e920047814c11ced1";



    $("button").on("click", function(event){
        event.preventDefault();
        getWeather($("#searchArea").val());
        // getForecast($("#searchArea").val());
    
    });

    // let uvi = "";
        

    // the ajax method to load content
    function getWeather(val) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ val +"&appid=" + apiKey + "&units=imperial",
            method: "GET"
        }).then(function(response) {
            $(".city").text(response.name);
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon +".png");
            $(".temp").text("Temperature: " + response.main.temp + " F");
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".windspeed").text("Wind Speed: " + response.wind.speed + " mph");

            $("div #cityStorage").append(`<li> ${val} </li>`);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            getUVI(lat, lon);

        });
    };

    function getUVI (lat, lon) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.value);
            $("#uvi").text("UVI: " + response.value);
        });

    }
});
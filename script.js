$(document).ready(function() {
    // this is my api key
    var apiKey="3022b7a270f3e92e920047814c11ced1";



    $("button").on("click", function(event){
        event.preventDefault();
        getWeather($("#searchArea").val());
        // getForecast($("#searchArea").val());
    
    });

        

    // the ajax method to load content
    function getWeather(val) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+ val +"&appid=" + apiKey + "&units=imperial",
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
            console.log(response);
            getUVI(lat, lon);

        });
    };

    function getUVI (lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var uvi = response.value;
            $("#uvi").text("UVI: " + uvi);
            $(".date").text("Date: " + response.date_iso);

            // add the conditions for the uvi styling
            if (uvi < 3) {
                $("#uvi").addClass("low");

            } else if (uvi > 3 && uvi < 5) {
                $("#uvi").addClass("moderate");
            } else {
                $("#uvi").addClass("severe");
            }

            getFuture(lat, lon);
        });

    }
    function getFuture(lat, lon) {
        $.ajax ({
            url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
            method: "GET"
        }).then(function(response){
            // Day 1
            $("#day1date").text("Date: " + response.list[2].dt_txt);
            $("#weathericon1").attr("src", "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon +".png");
            $("#day1temp").text("Temp: " + response.list[2].main.temp);
            $("#day1humidity").text("Humidity: " + response.list[2].main.humidity);

            //Day 2
            $("#day2date").text("Date: " + response.list[10].dt_txt);
            $("#weathericon2").attr("src", "https://openweathermap.org/img/wn/" + response.list[10].weather[0].icon +".png");
            $("#day2temp").text("Temp: " + response.list[10].main.temp);
            $("#day2humidity").text("Humidity: " + response.list[10].main.humidity);
            //Day 3
            $("#day3date").text("Date: " + response.list[18].dt_txt);
            $("#weathericon3").attr("src", "https://openweathermap.org/img/wn/" + response.list[18].weather[0].icon +".png");
            $("#day3temp").text("Temp: " + response.list[18].main.temp);
            $("#day3humidity").text("Humidity: " + response.list[18].main.humidity);
            //Day 4
            $("#day4date").text("Date: " + response.list[26].dt_txt);
            $("#weathericon4").attr("src", "https://openweathermap.org/img/wn/" + response.list[26].weather[0].icon +".png");
            $("#day4temp").text("Temp: " + response.list[26].main.temp);
            $("#day4humidity").text("Humidity: " + response.list[26].main.humidity);
            //Day 5
            $("#day5date").text("Date: " + response.list[34].dt_txt);
            $("#weathericon5").attr("src", "https://openweathermap.org/img/wn/" + response.list[34].weather[0].icon +".png");
            $("#day5temp").text("Temp: " + response.list[34].main.temp);
            $("#day5humidity").text("Humidity: " + response.list[34].main.humidity);
        })
    };


});
$(document).ready(function() {
// this is my api key
var apiKey="3022b7a270f3e92e920047814c11ced1";



$("button").on("click", function(event){
    event.preventDefault();
    console.log("working");
    getWeather($("#searchArea").val());
});


// the ajax method to load content
function getWeather(value) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+ value +"&appid=" + apiKey + "&units=imperial",
        method: "GET"
    }).then(function(response) {
        // Update these with classes needed
        $(".city").text(response.name);
        $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon +".png");
        $(".temp").text("Temperature: " + response.main.temp + " F");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".windspeed").text("Wind Speed: " + response.wind.speed + "mph");
        // $(".uvindex").text(response.name);
        
        console.log(response.weather[0].icon);
        console.log(current.uvi);

    })
}


});




const apiKey = "bd1840a704807ad102f70389e7a8759a";

let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=" + apiKey + '&q=';
let weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=" + apiKey + '&q=';

var forecast;




function start(){

    $("#forecastDispalay").hide();

    $("#search").on('click', function () {
        event.preventDefault();
        let city = $('#cityInput').val();
        console.log(city);
        currentWeather(city);
        forecastWeather(city);
        history(city);
        $("#forecastDispalay").show();
    });

}

function currentWeather(city){

    $.ajax({
        url: weatherURL + city,
        method: "GET"


    }).then(function getCurrent(info){
        console.log(info);

        $("#currentCity").text(`Current weather in ${info.name}`);
        $("#temp").text(`Temputure: ${info.main.temp } °F`);
        $("#hum").text(`Humidity: ${info.main.humidity}%`);
        $("#wind").text(`Wind speed: ${info.wind.speed} MPH`);
    });
}

function forecastWeather(city) {
    $.ajax({
        url: forecastURL + city,
        method: "GET"
    })
    .then(function (info) {

        console.log(info);
        forecast = info.list.filter(function (fore) {
            return fore.dt_txt.split(' ')[1] === '12:00:00';
        });

        
        
        console.log(forecast)

        $("#date1").text(`Date: ${moment(forecast[0].dt_txt.split(' ')[0], 'YYYY-MM-DD').format('ddd M/D')}`)
        $("#date2").text(`Date: ${moment(forecast[1].dt_txt.split(' ')[0], 'YYYY-MM-DD').format('ddd M/D')}`)
        $("#date3").text(`Date: ${moment(forecast[2].dt_txt.split(' ')[0], 'YYYY-MM-DD').format('ddd M/D')}`)
        $("#date4").text(`Date: ${moment(forecast[3].dt_txt.split(' ')[0], 'YYYY-MM-DD').format('ddd M/D')}`)
        $("#date5").text(`Date: ${moment(forecast[4].dt_txt.split(' ')[0], 'YYYY-MM-DD').format('ddd M/D')}`)
        
        $("#icon1").attr('src', `https://openweathermap.org/img/w/${forecast[0].weather[0].icon}.png`);
        $("#icon2").attr('src', `https://openweathermap.org/img/w/${forecast[1].weather[0].icon}.png`);
        $("#icon3").attr('src', `https://openweathermap.org/img/w/${forecast[2].weather[0].icon}.png`);
        $("#icon4").attr('src', `https://openweathermap.org/img/w/${forecast[3].weather[0].icon}.png`);
        $("#icon5").attr('src', `https://openweathermap.org/img/w/${forecast[4].weather[0].icon}.png`);
        
        $("#temp1").text(`Temperature: ${forecast[0].main.temp}°F`);
        $("#temp2").text(`Temperature: ${forecast[1].main.temp}°F`);
        $("#temp3").text(`Temperature: ${forecast[2].main.temp}°F`);
        $("#temp4").text(`Temperature: ${forecast[3].main.temp}°F`);
        $("#temp5").text(`Temperature: ${forecast[4].main.temp}°F`);

        $("#hum1").text(`Humidity: ${forecast[0].main.humidity}%`);
        $("#hum2").text(`Humidity: ${forecast[1].main.humidity}%`);
        $("#hum3").text(`Humidity: ${forecast[2].main.humidity}%`);
        $("#hum4").text(`Humidity: ${forecast[3].main.humidity}%`);
        $("#hum5").text(`Humidity: ${forecast[4].main.humidity}%`);
    });
};

function history(input){
    
    var cityHistory = localStorage.getItem("city", + " " + input);

    localStorage.setItem("city", cityHistory)

    var list = cityHistory.split(" ");



    for(var i = 0; i <= 5; i++){
        let idName = "#city" + i; 
        console.log(list[i])
        if(list[i] !== undefined && list[i] !== "null"){
            $(idName).val(list[i]);
        }
        else
        {
            $("#city0").val(input)

        }
    }


    $("#city0").on('click', function clicked(){
            currentWeather($("#city0").val())
            forecastWeather($("#city0").val())
        });
    
    $("#city1").on('click', function clicked(){
             currentWeather($("#city1").val())
            forecastWeather($("#city1").val())
        }); 

    $("#city2").on('click', function clicked(){
            currentWeather($("#city2").val())
            forecastWeather($("#city2").val())
        }); 

    $("#city3").on('click', function clicked(){
            currentWeather($("#city3").val())
            forecastWeather($("#city3").val())
        }); 

    $("#city4").on('click', function clicked(){
            currentWeather($("#city4").val())
            forecastWeather($("#city4").val())
        }); 

}

start();
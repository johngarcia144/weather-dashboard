var cities = [];



// displayCityInfo function re-renders the HTML to display the appropriate content
function displayCityInfo(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4e3233be19447a960ace2fad6e20dcb0";

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#cities-view").empty();

    var img = response.weather[0].icon
    var weatherIcon = "https://openweathermap.org/img/wn/" + img + "@2x.png";
    var image = $("<img>").attr("src", weatherIcon);    
    var date = moment().format('(MM/DD/YY)')
    
    
    console.log(date);

    // Creates a div to hold the city
    var cityDiv = $("<div class='city'>");
    var cityName = $("<h1>" + response.name + " " + date + "</h1>");
    var windSpeed = $("<p>").html("Wind Speed: " + response.wind.speed + " MPH");
    var humidity = $("<p>").html("Humidity: " + response.main.humidity + " %");
    var tempF = $("<p>").html((((response.main.temp - 273.15) * 1.8) + 32).toFixed(2) + " ℉");


    cityDiv.append(cityName, image, tempF, humidity, windSpeed);
    $("#cities-view").prepend(cityDiv);

    var lat = response.coord.lat;
    var long = response.coord.lon;

    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=4e3233be19447a960ace2fad6e20dcb0";

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {

var img0 = response.daily[0].weather[0].icon;
var weatherIcon0 = "https://openweathermap.org/img/wn/" + img0 + "@2x.png";
var image0 = $("<img>").attr("src", weatherIcon0);


var day0 = $("<div class=day0>");
var image0 = $("<img>").attr("src", weatherIcon0); 
console.log(image0)
var temp0 = ((((response.daily[0].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉");
console.log(temp0)
var humidity0 = (response.daily[0].humidity + " %");
console.log(humidity0);
day0.append(image0, temp0, humidity0);
$("#day-0").append(day0);



});

  });

}

// Function for displaying city data
function renderList() {

  // Deletes the cities prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#list-view").empty();
  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generates buttons for each cities in the array
    // This code $("<li>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<li>");
    // Adds a class of city to our button
    a.addClass("city list-group-item");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#list-view").append(a);
  }
}

// This function handles events where the add city button is clicked
$(".add-city").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var city = $("#city-input").val().trim();

  displayCityInfo(city)

  // The city from the textbox is then added to our array
  if(!cities.includes(city)) cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderList();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", function () {
    var city = $(this).attr("data-name");

    displayCityInfo(city)
});

// Calling the renderButtons function to display the initial buttons
renderList();
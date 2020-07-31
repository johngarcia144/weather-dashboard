var cities = [];

// displayCityInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {

  var city = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4e3233be19447a960ace2fad6e20dcb0";

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creates a div to hold the city
    var cityDiv = $("<h1>" + response.name + ", " + response.sys.country + "</h1>");
    var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " KPH");
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
    var coordinates = $("<p>").text(response.coord.lon + ", " + response.coord.lat);
    
    cityDiv.append(windSpeed, humidity, coordinates);
    $("#cities-view").prepend(cityDiv);
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

  // The city from the textbox is then added to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderList();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayCityInfo);

// Calling the renderButtons function to display the initial buttons
renderList();
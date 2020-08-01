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

    // Creates a div to hold the city
    var cityDiv = $("<div class='city'>");
    var cityName = $("<h1>" + response.name + " " + date + "</h1>");
    var windSpeed = $("<p>").html("Wind Speed: " + response.wind.speed + " MPH");
    var humidity = $("<p>").html("Humidity: " + response.main.humidity + "%");
    var uv = $("<p id='uv'>").html("UV Index: ");
    var tempF = $("<p>").html((((response.main.temp - 273.15) * 1.8) + 32).toFixed(2) + " ℉");

    cityDiv.append(cityName, image, tempF, humidity, windSpeed, uv);
    $("#cities-view").prepend(cityDiv);

    var lat = response.coord.lat;
    var long = response.coord.lon;

    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=4e3233be19447a960ace2fad6e20dcb0";

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {

        // empties the 5-day forecast everytime a new city is searched:
        $("#day-0").empty();
        $("#day-1").empty();
        $("#day-2").empty();
        $("#day-3").empty();
        $("#day-4").empty();
        
        // UVI index
        var uvi = response.current.uvi
        console.log(uvi);
        $('#uv').html("UV Index: " + uvi);

        // if (uvi < 5 && uvi > 0){
        //   uv.addClass("green")

          if (uvi <= 2) {
            uv.addClass("green");
           } else if (uvi <= 5) {
             uv.addClass("yellow");
           } else if (uvi <= 7) {
               uv.addClass("orange");
           } else if (uvi <= 10) {
               uv.addClass("red");
           } else if (uvi <= 40) {
               uv.addClass("purple");
           };
        
        

        // Day 0
          var img0 = response.daily[0].weather[0].icon;
          var weatherIcon0 = "https://openweathermap.org/img/wn/" + img0 + ".png";
          var image0 = $("<img>").attr("src", weatherIcon0);
          var date0 = moment().add(1, 'day');
          var date0El = $("<p>").html(date0.format("MM/DD/YY"));

          var day0 = $("<div class=day0>");
          var image0 = $("<img>").attr("src", weatherIcon0); 
          var temp0 = $("<p>").html((((response.daily[0].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉"); 
          console.log(temp0)
          var humidity0 = $("<p>").html("Humidity: " + response.daily[0].humidity + "%");
          console.log(humidity0);
          day0.append(date0El, image0, temp0, humidity0);
          $("#day-0").append(day0);

          // Day 1
          var img1 = response.daily[1].weather[0].icon;
          var weatherIcon1 = "https://openweathermap.org/img/wn/" + img1 + ".png";
          var image1 = $("<img>").attr("src", weatherIcon1);
          var date1 = moment().add(2, 'day');
          var date1El = $("<p>").html(date1.format("MM/DD/YY"));

          var day1 = $("<div class=day1>");
          var image1 = $("<img>").attr("src", weatherIcon1); 
          console.log(image1)
          var temp1 = $("<p>").html((((response.daily[1].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉"); 
          console.log(temp1)
          var humidity1 = $("<p>").html("Humidity: " + response.daily[1].humidity + "%");
          console.log(humidity1);
          day1.append(date1El, image1, temp1, humidity1);
          $("#day-1").append(day1);

          // Day 2
          var img2 = response.daily[2].weather[0].icon;
          var weatherIcon2 = "https://openweathermap.org/img/wn/" + img2 + ".png";
          var image2 = $("<img>").attr("src", weatherIcon2);
          var date2 = moment().add(3, 'day');
          var date2El = $("<p>").html(date2.format("MM/DD/YY"));

          var day2 = $("<div class=day2>");
          var image2 = $("<img>").attr("src", weatherIcon1); 
          var temp2 = $("<p>").html((((response.daily[2].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉"); 
          var humidity2 = $("<p>").html("Humidity: " + response.daily[2].humidity + "%");
          day2.append(date2El, image2, temp2, humidity2);
          $("#day-2").append(day2);

          // Day 3
          var img3 = response.daily[3].weather[0].icon;
          var weatherIcon3 = "https://openweathermap.org/img/wn/" + img3 + ".png";
          var image3 = $("<img>").attr("src", weatherIcon3);
          var date3 = moment().add(4, 'day');
          var date3El = $("<p>").html(date3.format("MM/DD/YY"));

          var day3 = $("<div class=day3>");
          var image3 = $("<img>").attr("src", weatherIcon3); 
          var temp3 = $("<p>").html((((response.daily[3].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉"); 
          var humidity3 = $("<p>").html("Humidity: " + response.daily[3].humidity + "%");
          day3.append(date3El, image3, temp3, humidity3);
          $("#day-3").append(day3);

          // Day 4
          var img4 = response.daily[4].weather[0].icon;
          var weatherIcon4 = "https://openweathermap.org/img/wn/" + img4 + ".png";
          var image4 = $("<img>").attr("src", weatherIcon4);
          var date4 = moment().add(5, 'day');
          var date4El = $("<p>").html(date4.format("MM/DD/YY"));

          var day4 = $("<div class=day4>");
          var image4 = $("<img>").attr("src", weatherIcon4); 
          var temp4 = $("<p>").html((((response.daily[4].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " ℉"); 
          var humidity4 = $("<p>").html("Humidity: " + response.daily[4].humidity + "%");
          day4.append(date4El, image4, temp4, humidity4);
          $("#day-4").append(day4);
      });
      
  });

};

// Function for displaying city data
function renderList() {

  // Deletes the cities prior to adding new cities
  $("#list-view").empty();
  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generates a list for each cities in the array
    var a = $("<li>");
    // Adds a class of city to our list
    a.addClass("city list-group-item");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial list text
    a.text(cities[i]);
    // Added the list to the list-view div
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
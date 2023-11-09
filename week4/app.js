const weatherInfo = document.querySelector('#weather-info'); //selecting the div with id weather-info

document.querySelector('#btn').addEventListener('click', function() {

    const cityName = document.querySelector('#cityInput').value; //getting the city name from the input field using id tag abd storing it
    if (cityName === '') { //if city name is empty
        alert('Please enter a city name'); // sending an alert message
    }
    else { //making a fetch request to the openweathermap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=94f0a4bb6d2f6072c7ba3db9ded78064&units=metric`)
        .then(response => {
            if (response.ok === false) { //is response is not ok
               throw new Error(`HTTP status code error! - ${response.status}`); //throws an error
            }
            return response.json(); //parsing the response as JSON
        })
        .then(data => {
            if (weatherInfo.innerHTML.match('Error')) {
                weatherInfo.innerHTML = ''; //clearing the weatherInfo div if it contains an error message
            }
            const createDiv = document.createElement("div"); //creating a div element
            createDiv.innerHTML = `<p>The weather in ${data.name} is ${data.weather[0].description}.<br>
            The temperature is ${data.main.temp}°C with a wind speed of ${data.wind.speed}m/s.</p> <hr> `; //adding the weather data to the div with weather, temperature and wind speed
            weatherInfo.insertBefore(createDiv, weatherInfo.firstChild); //inserting the div before the first child of weatherInfo
            document.querySelector('#cityInput').value = ''; //clearing the input field
        })
        .catch(error => {
            console.log(error); //logging an error
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`; //adding an error message to weatherInfo
            document.querySelector('#cityInput').value = '';
        });
    }
}); 
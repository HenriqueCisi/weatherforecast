//Javascript
//Strict Mode
'use-strict';


//Here we hidde, the loader animation
$('#loader').css('display', 'none');

//Url, receives the link to access the API Info
//apiKey, receives the key to access the API
//weekdays, is an object, with the days of the week

const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
const apiKey = '35c1f516098745bb900f93bd32f7016a';
const weekdays = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sab',
}



//Click Event, to search for any city in the world
$('#search').click(function(event) {
    event.preventDefault();
    const newCity = $('#city').val();

    getForecast(newCity);
});

//Using JQuery to make a request to the API
function getForecast(city) {
    //When the function is triggered by the click event, we hide the container that will receive the info, and reveal the loading animation
    $('#forecast').css('display', 'none');
    $('#loader').css('display', '');

    //clearFields;
    clearFields();

    //request to the API
    $.ajax({
        url: url,
        data: {
            key: apiKey,
            city: city,
            lang: 'pt'

        },
        success: function(result) {
            //On success, we hide the loading animation, and reveal the container with the info
            $('#loader').css('display', 'none');
            $('#forecast').css('display', '');

            $('#city-name').text(result.city_name);
            const forecast = result.data;
            const today = forecast[0];
            //displayToday
            displayToday(today);
            //displayNextDays;
            const nextDay = forecast.slice(1);
            displayNextDays(nextDay);

        },
        error: function() {
            console.log(error.responseText);
        }
    });
}
// When the function is triggered, it removes the content from the cards that hold the info for the next days
function clearFields() {
    $('#next-days').empty();
}

// When the function is triggered, it gets today's info, such as averageTemperature, windSpeed,relativeHumidity,weatherDescription, and the respectively weather icon
function displayToday(today) {
    const averageTemperature = Math.round(today.temp);
    const windSpeed = today.wind_spd;
    const relativeHumidity = today.rh;
    const weather = today.weather.description;
    const icon = today.weather.icon;
    const iconURL = `https://www.weatherbit.io/static/img/icons/${icon}.png`;


    $('#current-temperature').text(averageTemperature);
    $('#current-weather').text(weather);
    $('#current-wind').text(windSpeed);
    $('#current-humidity').text(relativeHumidity);
    $('#weather-icon').attr('src', iconURL);

}

// When the function is triggered, it gets the info for the next days
function displayNextDays(nextDay) {

    for (let i = 0; i < nextDay.length; i++) {
        const day = nextDay[i];
        const date = new Date(day.valid_date);
        const min = Math.round(day.min_temp);
        const max = Math.round(day.max_temp);
        const weekday = weekdays[date.getUTCDay()];

        const dayCard = $(`<div class="day-card">
			<div class="date">${date.getUTCDate()} / ${date.getUTCMonth() + 1}</div>
			<div class="weekday">${weekday}</div>
			<span class="max">${max}°</span>
			<span class="min">${min}°</span>
		</div>`);

        dayCard.appendTo('#next-days');
    }

}

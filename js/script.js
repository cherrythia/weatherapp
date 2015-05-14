var geoloc = {};

function getLocation() {
	var geoPosit = document.getElementById("geoPosit");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, failure);
    } else {
        geoPosit.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function success(position) {
    geoloc.lat = position.coords.latitude;
	geoloc.lon = position.coords.longitude;
	getMap();
}

function failure(error) {
	geoloc.error = error.message;
}

function getWeather () {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		getLocation();
		getMap();
		if (xhr.readyState === 4 && xhr.status === 200) {
			var data = JSON.parse(xhr.responseText)

			//"wind speed" & "wind deg"
			var wind = document.getElementById("wind");
			wind.innerHTML += "speed is " + data.wind.speed;
			wind.innerHTML += ", direction is " + data.wind.deg;

			// Temperture kelvin data
			var temp = document.getElementById("temp");
			temp.innerHTML += Math.round(parseFloat(data.main.temp, 10) - 273);

			/*var info = document.getElementById("info");
			info.innerHTML = data.weather[0].icon;
			*/
		}
	}

	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + geoloc.lat + "&lon=" + geoloc.lon;

	xhr.open('GET', url, true);
	xhr.send(null);
}

function getMap() {
	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: new google.maps.LatLng(geoloc.lat,geoloc.lon),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvas,mapOptions)
	}

google.maps.event.addDomListener(window,'load',getWeather);

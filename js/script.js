var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		var data = JSON.parse(xhr.responseText)
		var info = document.getElementById("info");
		info.innerHTML = data.weather[0].main;
		var temp = document.getElementById("temp");
		temp.innerHTML = data.main.temp;
	}
}

xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=1.3&lon=103.8', true);
xhr.send(null);

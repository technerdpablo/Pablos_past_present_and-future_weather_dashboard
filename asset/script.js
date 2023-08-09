function getInfo(){
    const inputName= document.getElementById("cityInput");
    const nameOfCity= document.getElementById("nameOfCity")
    nameOfCity.innerHTML ="--" +inputName.value+"--"
}

var apiKey = "f793886684d26495c42d8467c2445472"
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Orlando,&limit=5&appid=${apiKey}`)
.then((response) => response.json()).then((data) => {


longitude= data[0].lon;
latitude= data[0].lat;

console.log(latitude);


fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
.then((response) => response.json()).then((data) => {



console.log(data.list);
    var counter = 1;
for (var i = 0; i < data.list.length; i+=8) {
    var url = "https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png"
    currentTemp=`${data.list[i].main.temp}`
    humidity= data.list[i].main.humidity
    wind= data.list[i].wind.speed
    console.log(currentTemp);
    var tempEl = document.getElementById("day"+counter+"Min")
    tempEl.textContent = currentTemp
    var humidityEl = document.getElementById("hum"+counter)
    humidityEl.textContent = humidity
    var windEl = document.getElementById("wind"+counter)
    windEl.textContent = wind
    var imgEl = document.getElementById("img"+counter)
    imgEl.src = url
    counter++
}









});
});

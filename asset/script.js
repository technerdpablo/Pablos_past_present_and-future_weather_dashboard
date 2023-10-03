var apiKey = "f793886684d26495c42d8467c2445472"
   const submit= document.getElementById("submit")
   const current= document.getElementById("current")
function getInfo(){
    const locationInput= document.getElementById("locationInput")
    // const inputName= document.getElementById("cityInput");
    // const nameOfCity= document.getElementById("nameOfCity")
    // nameOfCity.innerHTML ="--" +inputName.value+"--"
    getGeo(locationInput.value)
}
function getGeo(city){

fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
.then((response) => response.json()).then((data) => {


longitude= data[0].lon;
latitude= data[0].lat;

console.log(latitude);
getFiveDay(latitude,longitude)
getCurrent(latitude,longitude)
})}
function getCurrent(latitude,longitude){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then((response) => response.json()).then((data) => { 
        console.log(data)
        var temp= document.createElement("p")
        var wind= document.createElement("p")
        var humidity= document.createElement("p")
        var img= document.createElement("img")
        temp.textContent=data.main.temp
        wind.textContent=data.wind.speed
        humidity.textContent=data.main.humidity
        img.setAttribute("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
        current.append(img,temp,wind,humidity)
    })
}
function getFiveDay(latitude,longitude){


fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
.then((response) => response.json()).then((data) => {



console.log(data.list);
    var counter = 1;
for (var i = 0; i < data.list.length; i+=8) {
    var url = "https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png"
    currentTemp=`${data.list[i].main.temp}`
    humidity= data.list[i].main.humidity
    wind= data.list[i].wind.speed
    var dt = data.list[i].dt
    console.log(currentTemp);
    var tempEl = document.getElementById("day"+counter+"Min")
    tempEl.textContent = currentTemp
    var humidityEl = document.getElementById("hum"+counter)
    humidityEl.textContent = humidity
    var windEl = document.getElementById("wind"+counter)
    windEl.textContent = wind
    var imgEl = document.getElementById("img"+counter)
    imgEl.src = url
    var day = document.getElementById("day"+counter)
    day.textContent = dayjs.unix(dt).format("dddd")
    counter++
}

});
};
submit.addEventListener("click",getInfo)
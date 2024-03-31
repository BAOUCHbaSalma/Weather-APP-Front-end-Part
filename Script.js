// const key="244155d43b7fc901f0f438ae76092427"
// // const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`;

// // fetch(url).then(res =>{
// //     return res.json();
// // }).then(city => {
// //     console.log(city);
// // })



const key = "244155d43b7fc901f0f438ae76092427";

async function searchWeather() {
    let villeInput = document.getElementById("search").value.trim();

    if (villeInput !== '') {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${villeInput}&limit=5&appid=${key}`);
        const data = await response.json();
       console.log(data)

        if (data.length > 0) {
            const { lat, lon } = data[0];
           
        
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`; 
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            displayWeather(weatherData);
           
           
        } else {
            alert('City not found.');
        }
    } else {
        alert('Please enter a city name.');
    }
}




function displayWeather(data) {
   const img = getIcon(data) ; 
    document.getElementById('imgs').src = img;
   
    const windSpeed = data.wind.speed + 'km/h'; 
    document.getElementById('windSpeed').innerText = windSpeed;

    const humidityValue = data.main.humidity + '%'; 
    document.getElementById('humidityValue').innerText = humidityValue;

    const temperatureCelsius = (data.main.temp - 273.15).toFixed(1)+ '°C'; 
    document.getElementById('temperatureValue').innerText = temperatureCelsius ;

    document.getElementById("tempe").innerHTML = temperatureCelsius;

    const feels_like = (data.main.feels_like - 273.15).toFixed(1)+ '°C'; 
    document.getElementById('Real_Feel').innerText = feels_like ;

    const sealevel = data.main.sea_level + ' hPa'; 
    document.getElementById('sealevel').innerText = sealevel;

     const Pressure= data.main.pressure + ' hPa'; 
     document.getElementById('Pressure').innerText = Pressure;

     const Temperature_max = (data.main.temp_max - 273.15).toFixed(1)+ '°C'; 
     document.getElementById('tem_max').innerText = Temperature_max;

     const Temperature_min = (data.main.temp_min - 273.15).toFixed(1)+ '°C'; 
     document.getElementById('tem_min').innerText = Temperature_min;



    
  
    const Rise = data.sys.sunrise; 
    const heureLeverSoleil =convertirHorodatageUnix(Rise);
    document.getElementById('rise').innerText = heureLeverSoleil  ;

    const Set = data.sys.sunset ; 
    const heureCoucherSoleil = convertirHorodatageUnix(Set);

    document.getElementById('set').innerText = heureCoucherSoleil ;


    const Description = data.weather[0].description; 
    document.getElementById('desc').innerText = Description;city

    const Name = data.name ; 
    document.getElementById('city').innerText = Name;






}



function convertirHorodatageUnix(heureUnix) {
    
    const milliseconds = heureUnix * 1000;

    
    const dateUTC = new Date(milliseconds);

   
    const dateLocale = new Date(dateUTC.getTime());

 
    const heure = ('0' + dateLocale.getHours()).slice(-2);
    const minutes = ('0' + dateLocale.getMinutes()).slice(-2);
    const secondes = ('0' + dateLocale.getSeconds()).slice(-2);

    return heure + ':' + minutes + ':' + secondes;
}

function getIcon(data){

    if(data.weather[0].main === "Clouds"){
      return "/images/clouds.png";
    }
    else if(data.weather[0].main === "Rain"){
      return "/images/raind.png";
    }
    else if(data.weather[0].main === "Snow"){
      return "/images/snow.png";
    }
    else if(data.weather[0].main === "Clear"){
      return "/images/c.png";
    }

}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day;

function updateClock() {
  var now = new Date();

  day = days[now.getDay()]; 

  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  var time = hour + ":" + minute + ":" + second;
  var fullTime = day + " " + time;

  var clockElement = document.getElementById("clock");
  clockElement.textContent = fullTime;
}


setInterval(updateClock, 1000);



function updateDate() {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var now = new Date();
  var dayOfWeek = days[now.getDay()];
  var dayOfMonth = now.getDate();
  var month = months[now.getMonth()];
  var year = now.getFullYear();

  var formattedDate = dayOfMonth + "-" + month + "-" + year; 

  var dateElement = document.querySelector('.date'); 
  dateElement.textContent = formattedDate;
}


updateDate();



// const latB = 32.334193;
// const lonB = 6.353335;


// async function fetchWeatherData() {

//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latB}&lon=${lonB}&appid=${key}`);
//     const weatherData = await response.json();
//     const temperatureCelsiusbm = (weatherData.main.temp - 273.15).toFixed(1) + '°C';
//     document.getElementById('temperatureBeniMellal').innerText = temperatureCelsiusbm;
 
// }

// fetchWeatherData();

const cities = [
    { name: 'Beni Mellal', lat: 32.334193, lon:-6.353335 },
    { name: 'Azilal', lat: 31.959295, lon: -6.570991 },
    { name: 'Khenifra', lat: 32.9357718, lon: -5.6696504 },
    { name: 'Azrou', lat: 33.436117, lon: -5.221913 },
    { name: 'Sefrou', lat: 33.824898, lon: -4.833336 },
    { name: 'Rabat', lat: 34.022405, lon: -6.834543 },
    { name: 'Taza', lat: 34.230155, lon: -4.010104 },
    { name: 'Khouribga', lat: 32.885508, lon: -6.909238 },
    { name: 'Casablanca', lat: 33.5950627, lon: -7.6187768 }
 
];

async function fetchWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${key}`);
  const weatherData = await response.json();
  console.log(weatherData)

  
  const iconUrl = getIcon(weatherData);

 
  const cityNameClass = city.name.replace(/\s+/g, '-').toLowerCase();


  const images = document.querySelectorAll(`.imgs.${cityNameClass}`);
  images.forEach(image => {
    image.src = iconUrl;
  });

 
  const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(1) + '°C';
  document.getElementById(`temperature${city.name.replace(/\s+/g, '')}`).innerText = temperatureCelsius
 
}

async function fetchAllWeatherData() {
  for (const city of cities) {
    await fetchWeatherData(city);
  }
}

fetchAllWeatherData();

document.getElementById("ser").addEventListener('click', function() {
  document.getElementById("principal").style.display = 'flex';
  document.getElementById("home").style.display = 'none';
});








// const key="244155d43b7fc901f0f438ae76092427"
// // const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`;

// // fetch(url).then(res =>{
// //     return res.json();
// // }).then(city => {
// //     console.log(city);
// // })


// let lat = null;
// let lon = null;
// let ville= document.getElementById("search");

// let villeC = ville.value;

// async function get(){
//     const response= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${villeC}&limit=5&appid=${key}`)
//     const data = await response.json()
//     lat = data[0].lat;
//     lon = data[0].lon;
//     const url =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
//     const data2 = await url.json()
//     console.log(data2)


// }
// get()

const key = "244155d43b7fc901f0f438ae76092427";

async function searchWeather() {
    let villeInput = document.getElementById("search").value.trim();

    if (villeInput !== '') {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${villeInput}&limit=5&appid=${key}`);
        const data = await response.json();

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


const windDiv = document.getElementById('windDiv');
const humidityDiv = document.getElementById('humidityDiv');
const temperatureDiv = document.getElementById('temperatureDiv');

function displayWeather(data) {
   
    const windSpeed = data.wind.speed + 'km/h'; 
    document.getElementById('windSpeed').innerText = windSpeed;

    
    
    const humidityValue = data.main.humidity + '%'; 
    document.getElementById('humidityValue').innerText = humidityValue;

  
   
    const temperatureValue = data.main.temp + '°C'; 
    document.getElementById('temperatureValue').innerText = temperatureValue;
}








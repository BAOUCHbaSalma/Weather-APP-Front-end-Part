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
            console.log(weatherData)
            displayWeather(weatherData);
           
           
        } else {
            alert('City not found.');
        }
    } else {
        alert('Please enter a city name.');
    }
}




function displayWeather(data) {
   
    const windSpeed = data.wind.speed + 'km/h'; 
    document.getElementById('windSpeed').innerText = windSpeed;

    
    
    const humidityValue = data.main.humidity + '%'; 
    document.getElementById('humidityValue').innerText = humidityValue;

    const temperatureCelsius = (data.main.temp - 273.15).toFixed(1)+ '°C'; 
    document.getElementById('temperatureValue').innerText = temperatureCelsius ;
    
    
    const decalageUTC = 0; 
    const Rise = data.sys.sunrise; 
    const heureLeverSoleil =convertirHorodatageUnix(Rise, decalageUTC);
    document.getElementById('rise').innerText = heureLeverSoleil  ;

    const Set = data.sys.sunset ; 
    const heureCoucherSoleil = convertirHorodatageUnix(Set, decalageUTC);

    document.getElementById('set').innerText = heureCoucherSoleil ;

}



function convertirHorodatageUnix(heureUnix, decalageUTC) {
    
    const milliseconds = heureUnix * 1000;

    
    const dateUTC = new Date(milliseconds);

   
    const millisecondsDecalage = decalageUTC * 60 * 60 * 1000;
    const dateLocale = new Date(dateUTC.getTime() + millisecondsDecalage);

 
    const heure = ('0' + dateLocale.getHours()).slice(-2);
    const minutes = ('0' + dateLocale.getMinutes()).slice(-2);
    const secondes = ('0' + dateLocale.getSeconds()).slice(-2);

    return heure + ':' + minutes + ':' + secondes;
}











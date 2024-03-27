const key="244155d43b7fc901f0f438ae76092427"
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`;

// fetch(url).then(res =>{
//     return res.json();
// }).then(city => {
//     console.log(city);
// })
let lat = null;
let lon = null;
let ville= document.getElementById("search").value;

async function get(){
    const response= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=5&appid=${key}`)
    const data = await response.json()
    lat = data[0].lat;
    lon = data[0].lon;
    const url =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const data2 = await url.json()
    console.log(data2)


}
get()



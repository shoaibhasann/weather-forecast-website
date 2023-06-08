// showing current day and time in weather now section of html document 

const showDay = document.getElementById('day');

const date = new Date();

let today = date.getDay();

const days = [
    'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
]

showDay.innerHTML = `${days[today]}`


const showTime = document.getElementById('time');

let currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

showTime.innerHTML = `${currentTime}` 

// //  handling api 

// const temp = document.getElementById('temp');
// const cityName = document.getElementById('cityName');
// const city = document.getElementById('city') ;
// const submit = document.getElementById('submit');

// const options = {
//   method: "GET",
//   headers: {
//     "X-Api-Key": "CBhQ6k/9Ku4NQDVpcV+Qkg==WxTdsdewoUnBWOFU"
//   },
// };

// const getWeather = (city) => {
//     cityName.innerHTML = city ;
//     fetch("https://api.api-ninjas.com/v1/weather?city=" + city , options)
//      .then(response => response.json())
//      .then(response => {
//          console.log(response);
//          cloud_pct = response.cloud_pct;
//          feels_like = response.feels_like;
//          humidity = response.humidity;
//          max_temp = response.max_temp;
//          min_temp = response.min_temp;
//          sunrise = response.sunrise;
//          sunset = response.sunset;
//          temp.innerHTML = response.temp + "°c";
//          wind_degrees = response.wind_degrees;
//          wind_speed9 = response.wind_speed9;

//      })
//      .catch(err => console.error(err));
//     }
// submit.addEventListener('click', (e) => {
//     e.preventDefault()
//     getWeather(city.value)
// })
// // calling api for city Delhi by default 
//     getWeather("Delhi");
   

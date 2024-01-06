const apiKey = "getUrOwn";
const link = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

let fahrenheit = false;

async function weatherCall(input) {
    // Fetches weather data from the api
    const result = await fetch(link + input);
    const JSONresult = await result.json()
    return JSONresult;
}

async function weatherReturn(input) {
    // Calls weatherCall and retrieves data before processing it and returning
    let weather = await weatherCall(input)
    .then(result => {
      return result;
    })
    .catch(result => {
      console.log("error");
    });
    return weather;
}

const button = document.getElementById("button");
const loc = document.getElementById("location");
const temp = document.getElementById("temp");
const hum = document.getElementById("humidity");
const feel = document.getElementById("feels");
const time = document.getElementById("time");
const ic = document.getElementById("con");
const con = document.getElementById("con5");

async function weatherDisplay(input) {
    console.log(input)
    if (input.value) {
      input = input.value;  
      console.log(input)
    } else if (typeof input.innerHTML === "string") {
      input = input.innerHTML
    } else {
      console.log(input.coords.latitude)
      input = input.coords.latitude + " " + input.coords.longitude;
    } 
    const weather = await weatherReturn(input);
    document.getElementById("input").value = "";
    loc.innerHTML = weather.location.name + ", " + weather.location.country;
    temp.innerHTML = fahrenheit ? weather.current.temp_f + "°F" : weather.current.temp_c + "°C";
    hum.innerHTML = weather.current.humidity + "%";
    const tim = weather.current.last_updated.split(" ")[1];
    if (tim.split(":")[0] > 18 || tim.split(":")[0] < 7) {
      document.querySelector("body").style.backgroundImage = "url('imgs/night.png')";
    }
    else {
      document.querySelector("body").style.backgroundImage = "url('imgs/day.png')";
    }
}

button.addEventListener('click', async () => {
  const input = document.getElementById("input");
  weatherDisplay(input);
});

addEventListener("DOMContentLoaded", async () => {
  if(navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(weatherDisplay))
  } else {
    await weatherDisplay("Washington");
  }
});

const f = document.getElementById("f");
f.addEventListener('click', () => {
  if(fahrenheit) {
    fahrenheit = false;
    f.innerHTML = "F";
    weatherDisplay(loc);
  } else {
    fahrenheit = true;
    f.innerHTML = "C";
    console.log(fahrenheit);
    weatherDisplay(loc);
  }
});

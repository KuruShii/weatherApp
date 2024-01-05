const apiKey = "c6705d4a1bc1422eb17161310240501";
const link = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

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

button.addEventListener("click", async () => {
    try {
        const input = document.getElementById("input");
        const weather = await weatherReturn(input.value);
        console.log(weather);
        loc.innerHTML = weather.location.name + ", " + weather.location.country;
        temp.innerHTML = weather.current.temp_c;
        hum.innerHTML = weather.current.humidity + '%';
        feel.innerHTML = weather.current.feelslike_c;
        time.innerHTML = weather.current.last_updated;
        ic.src = weather.current.condition.icon;
        con.innerHTML = weather.current.condition.text;
    } catch(error) {
        console.log("error");
    }
});
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

async function weather(input) {
    const weather = await weatherReturn(input);
    console.log(weather.location.name);
    return await weather.location.name;
}
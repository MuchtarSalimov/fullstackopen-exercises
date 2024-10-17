import axios from "axios"

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (capital, latitude, longitude) => {
  const fullUrl = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

  const request = axios.get(fullUrl)
  return request.then((response)=> {
      const data = {
        capital: capital,
        temp: (response.data.main.temp -273.15).toFixed(2),  // convert from Kelvin to Celsius
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed 
      }
      return data
    })
}

export default { getWeather }
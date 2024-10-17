import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountryList = () => {
   const request = axios.get(`${baseUrl}/all`)
   return request.then((response) => response.data.map((entry)=>entry.name.common))
}

const getCountryInfo = countryName => {
  const request = axios.get(`${baseUrl}/name/${countryName}`)
  return request.then((response) => {
    const data = response.data
    return {
      name: data.name.official,
      capital: data.capital[0],
      area: data.area,
      languages: Object.values(data.languages),
      flagUrl: data.flags.png,
    }
  })
}

export default { getCountryList, getCountryInfo }
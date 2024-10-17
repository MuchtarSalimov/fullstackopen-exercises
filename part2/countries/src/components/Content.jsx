import countriesService from "../services/countriesService"
import { useState, useEffect } from "react"
import emptyObject from "../misc/emptyObject"
import weatherService from "../services/weatherService"

const emptyCountryData = emptyObject.emptyCountryData
const emptyWeatherData = emptyObject.emptyWeatherData

const countryList = await countriesService.getCountryList()

function Content({ query, handleCountryClick }) {

  const [matchedCountries, setMatchedCountries] = useState([])
  const [specifiedCountryData, setSpecifiedCountryData] = useState({ ...emptyCountryData})
  const [weatherData, setWeatherData] = useState({ ...emptyWeatherData })

useEffect(()=>{
    setMatchedCountries([ ...countryList])
  }, [])

  // when input query changed, updates match list and if only one, fetches data specific to that country
  useEffect(()=>{
    
    setMatchedCountries(countryList.filter((country)=>country.toLowerCase().includes(query.toLowerCase())))
  }, [ query ])

  // watches to see if only one country remains a match, then updates specified country if necessary
  useEffect(()=>{
    if ( matchedCountries.length === 1 ) {
      // and specified country data is not set or for wrong country
      if ( specifiedCountryData.isEmpty || specifiedCountryData.name !== matchedCountries[0])
        // set to only country that matches the query
        countriesService
          .getCountryInfo(matchedCountries[0])
          .then((data)=>{
          setSpecifiedCountryData({ ...data, isEmpty:false })
        })
    } else {
      setSpecifiedCountryData({ ...emptyCountryData })
    }
  }, [matchedCountries])


  // weather data updates when specified country changes
  useEffect(()=>{
    switch(true) {
      case specifiedCountryData.isEmpty && weatherData.isEmpty:
        // both empty states match, do nothing
        break
      case specifiedCountryData.isEmpty && !weatherData.isEmpty:
        // clear weather data since no country
        setWeatherData(emptyWeatherData)
        break
      case !specifiedCountryData.isEmpty && weatherData.isEmpty:
        // fill weather data with country data
        //TODO
        weatherService
          .getWeather(
            specifiedCountryData.capital,
            specifiedCountryData.capitalLatitude,
            specifiedCountryData.capitalLongitude)
          .then((data)=>{
            setWeatherData({
              isEmpty: false,
              capital: data.capital,
              temp: data.temp,
              icon: data.icon,
              windSpeed: data.windSpeed
            })
          })
        break
      case !specifiedCountryData.isEmpty && !weatherData.isEmpty:
        // 2 cases here. weather matches or doesnt
        if (specifiedCountryData.capital === weatherData.capital) {
          // capitals match so do nothing
        } else {
          // update weather data to match weather in capital of current specified country
          weatherService.getWeather(
            specifiedCountryData.capital,
            specifiedCountryData.capitalLatitude,
            specifiedCountryData.capitalLongitude)
          .then((data)=>{
            setWeatherData({
              isEmpty: false,
              capital: data.capital,
              temp: data.temp,
              icon: data.icon,
              windSpeed: data.windSpeed
            })
          })
        }
        break
      default: console.log('error, this should never happen. gap in conditionals')
    }
  }, [specifiedCountryData])

  switch(true) {
    case !specifiedCountryData.isEmpty:
        return (<div>
        <h1>{ specifiedCountryData.name }</h1>
        <div>capital { specifiedCountryData.capital }</div>
        <div>area { specifiedCountryData.area }</div>
        <h3>languages</h3>
        <ul>
          { specifiedCountryData.languages.map((language)=> <li key={ language }>{ language }</li> ) }
        </ul>
        <img src={ specifiedCountryData.flagUrl } />
        <h2>Weather in { weatherData.capital }</h2>
        <p>temperature { weatherData.temp } Celsius</p>
        <img src={ `https://openweathermap.org/img/wn/${ weatherData.icon }@2x.png` }></img>
        <p>wind { weatherData.windSpeed } m/s</p>
      </div>)
      break
    case matchedCountries.length < 20:
      return (
        <>
          {
            matchedCountries.map(country=> <div key={ country }><div>{ country }{' '}<button value={ country } onClick={ handleCountryClick }>show</button></div></div> )
          }
        </>
      )
      break
    default:
      return <div>too many matches, specify another filter</div>
      break
  }
}

export default Content
import countriesService from "../services/countriesService"
import { useState, useEffect } from "react"

const countryList = await countriesService.getCountryList()

function Content({ query, handleCountryClick }) {
  const emptyCountryData = {
    isEmpty: true,
    name: '',
    capital: '',
    area: 0,
    languages: [],
    flagUrl: '',
  }

  const [matchedCountries, setMatchedCountries] = useState([])
  const [specifiedCountryData, setSpecifiedCountryData] = useState({ ...emptyCountryData})

/*  Shape of specifiedCountryData if set:
  {
    name: string
    capital: string
    area: number,
    languages: array of string,
    flagUrl: string
  }
*/

useEffect(()=>{
    setMatchedCountries([ ...countryList])
  }, [])


  // when input query changed, updates match list and if only one, fetches data specific to that country
  useEffect(()=>{
    
    setMatchedCountries(countryList.filter((country)=>country.toLowerCase().includes(query.toLowerCase())))
  }, [ query ])

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
      setSpecifiedCountryData({ ...emptyCountryData }
      )
    }
  }, [matchedCountries])

  switch(true) {
    case !specifiedCountryData.isEmpty:
        return (<div>
        <h1>{ specifiedCountryData.name }</h1>
        <div>capital { specifiedCountryData.capital }</div>
        <div>area { specifiedCountryData.area }</div>
        <h3>languages</h3>
        <ul>
          { specifiedCountryData.languages.map(language=> { <li key={ language }>{ language }</li> }) }
        </ul>
        <img src={ specifiedCountryData.flagUrl } />
      </div>)
      break
    case matchedCountries.length < 20:
      return (
        <>
          {
            matchedCountries.map(country=> <div key={ country }>{ country }</div> )
          }
        </>
      )
      break
    default:
      return <div>too many matches, specify another filter</div>
      break
  }
}
//                   <button value={ country } onClick={ handleCountryClick }>show</button>
export default Content
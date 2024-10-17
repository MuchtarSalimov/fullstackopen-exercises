import { useState } from 'react'
import Filter from "./components/Filter"
import Content from "./components/Content"

const App = () => {

  const [queryText, setQueryText] = useState('')

  const handleTextChange = event => setQueryText(event.target.value)
  const handleCountryClick = event => setQueryText(event.target.value)

  return (
    <div>
      <Filter text={ queryText } handleChange={ handleTextChange } />
      <Content query={ queryText } handleCountryClick={ handleCountryClick } />
    </div>
  )
}

export default App
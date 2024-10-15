import { useState } from 'react'

const Button = ({ label, handleClick }) => {
  return (
  <button onClick={ handleClick }>{ label }</button>
  )
}

const Stats = ({ type, count }) => {
  return (
    <p>{ type } { count }</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = (...numbers) => numbers.reduce((acc, number) => acc + number)
  const average = (good, bad, neutral) => sum(good, -bad)/sum(good, bad, neutral)
  const percentPositive = (good, bad, neutral) => 100*good/sum(good, bad, neutral) 

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" handleClick={ () => setGood(good + 1) } />
      <Button label="neutral" handleClick={ () => setNeutral(neutral + 1) }/>
      <Button label="bad" handleClick={ () => setBad(bad + 1) }/>
      <h1>statistics</h1>
      <Stats type="good" count={ good } />
      <Stats type="netural" count={ neutral } />
      <Stats type="bad" count={ bad } />
      <Stats type="all" count={ sum(good, bad, neutral) } />
      <Stats type="average" count={ average(good, bad, neutral) || "N/A" }  />
      <Stats type="positive" count={ `${percentPositive(good, bad, neutral)} %`|| "N/A" } />

    </div>
  )
}

export default App
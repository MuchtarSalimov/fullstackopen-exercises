import { useState } from 'react'

const Button = ({ label, handleClick }) => {
  return (
  <button onClick={ handleClick }>{ label }</button>
  )
}

const Statistics = ( { good, bad, neutral }) => {

  const sum = (...numbers) => numbers.reduce((acc, number) => acc + number)
  const average = (good, bad, neutral) => sum(good, -bad)/sum(good, bad, neutral)
  const percentPositive = (good, bad, neutral) => 100*good/sum(good, bad, neutral) 

  if (sum(good, bad, neutral) === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <Stat type="good" count={ good } />
      <Stat type="netural" count={ neutral } />
      <Stat type="bad" count={ bad } />
      <Stat type="all" count={ sum(good, bad, neutral) } />
      <Stat type="average" count={ average(good, bad, neutral) }  />
      <Stat type="positive" count={ `${ percentPositive(good, bad, neutral) } %` } />
    </>
  )
}

const Stat = ({ type, count }) => {
  return (
    <p>{ type } { count }</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" handleClick={ () => setGood(good + 1) } />
      <Button label="neutral" handleClick={ () => setNeutral(neutral + 1) }/>
      <Button label="bad" handleClick={ () => setBad(bad + 1) }/>
      <h1>statistics</h1>
      <Statistics good={ good } bad ={ bad } neutral={ neutral } />
    </div>
  )
}

export default App
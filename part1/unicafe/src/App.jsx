import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
  <button onClick={ handleClick }>{ text }</button>
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
    <table>
      <tbody>
        <StatisticLine  type="good" value={ good } />
        <StatisticLine  type="netural" value={ neutral } />
        <StatisticLine  type="bad" value={ bad } />
        <StatisticLine  type="all" value={ sum(good, bad, neutral) } />
        <StatisticLine  type="average" value={ average(good, bad, neutral) } />
        <StatisticLine  type="positive" value={ `${ percentPositive(good, bad, neutral) } %` } />
      </tbody>
    </table>
  )
}

const StatisticLine  = ({ type, value }) => {
  return (
    <tr>
      <td>{ type } </td>
      <td>  { value } </td>   
    </tr>
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
      <Button text="good" handleClick={ () => setGood(good + 1) } />
      <Button text="neutral" handleClick={ () => setNeutral(neutral + 1) }/>
      <Button text="bad" handleClick={ () => setBad(bad + 1) }/>
      <h1>statistics</h1>
      <Statistics good={ good } bad ={ bad } neutral={ neutral } />
    </div>
  )
}

export default App
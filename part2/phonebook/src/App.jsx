import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  // initialize persons from db in json-server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).indexOf(newName) >= 0 ){
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={ nameFilter } handleFilterChange={ handleNameFilterChange }/>

      <h3> add a new </h3>

      <PersonForm
        newName={ newName }
        newNumber={ newNumber }
        handleNameChange={ handleNameChange }
        handleNumberChange={ handleNumberChange }
        addNewPerson={ addNewPerson }
      />

      <h3>Numbers</h3>

      <Persons persons={ persons } nameFilter={ nameFilter }/>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  // initialize persons from json-server database
  useEffect(() => {
    personService
      .getAllPersons()
      .then((data) => setPersons(data))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).indexOf(newName) >= 0 ){
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .createPerson(newPerson)
        .then((createdPerson) => setPersons(persons.concat(createdPerson)))
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

  const handleDelete = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      // delete person from json server, then locally
      personService
        .deletePerson(person.id)
        .then(deletedPerson => setPersons(persons.filter((person) => person.id !== deletedPerson.id)))
    }
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

      <Persons
        persons={ persons }
        nameFilter={ nameFilter }
        handleDelete={ handleDelete }/>
    </div>
  )
}

export default App
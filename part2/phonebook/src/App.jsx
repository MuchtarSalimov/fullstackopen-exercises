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

    // index will be -1 if name not already in persons array
    const existingIndex = persons.map((person) => person.name).indexOf(newName)
    if ( existingIndex >= 0 ) {
    
      const confirmationMessage = `${newName} is already added to the phonebook, replace the old number with a new one?`

      if(window.confirm(confirmationMessage)) {
        const oldPerson = persons[existingIndex]
        const newPerson = { ...oldPerson, number: newNumber}

        // update person in database, then update person in local state
        personService
          .updatePerson(oldPerson, newPerson)
          .then(updatedPerson => setPersons(persons.map((person) => person.id === updatedPerson.id ? { ...person, number: updatedPerson.number}: person)))
        }

    } else {
      const newPerson = { name: newName, number: newNumber }

      // create new person on database, then create new person in local state
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
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
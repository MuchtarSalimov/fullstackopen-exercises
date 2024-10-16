import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('success')

  // initialize persons from json-server database
  useEffect(() => {
    personService
      .getAllPersons()
      .then((data) => setPersons(data))
  }, [])

  const sendNotification = (type, message) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage('')  
      setNotificationType('success')
    }, 3000)
  } 

  const addNewPerson = (event) => {
    event.preventDefault()

    // person from input field will either be added, or updated if already exists
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
          .then(updatedPerson => {
            setPersons(persons.map((person) => person.id === updatedPerson.id ? { ...person, number: updatedPerson.number}: person))

            sendNotification('success', `Updated ${ newName }`)
          })
          .catch(() => sendNotification('error', `Information of ${ newName } has already been removed from the server`))
        }

        setNewName('')
        setNewNumber('')

    } else {
      const newPerson = { name: newName, number: newNumber }

      // create new person on database, then create new person in local state
      personService
        .createPerson(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          sendNotification('success', `Added ${ newPerson.name }`)
        })
        .catch(() => sendNotification('error', `Failed to add ${ newPerson.name }`))

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
        .then(deletedPerson => {
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
          sendNotification('success', `Deleted ${ person.name }`)
        })
        .catch(() => sendNotification('error', `Failed to delete ${ person.name }`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification type={ notificationType } message={ notificationMessage }/>
      
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
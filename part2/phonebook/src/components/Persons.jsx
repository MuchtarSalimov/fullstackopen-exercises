import React from 'react'

function Persons({ persons, nameFilter, handleDelete }) {
  return (
    <div>
      {
        persons
        .filter((person)=> person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map((person) =>
        <div key={ person.name }>
          <p>{ person.name } { person.number } &nbsp; 
            <button onClick={ () => handleDelete(person) }>delete</button>
          </p>
        </div>)
      }
    </div>
  )
}

export default Persons
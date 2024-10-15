import React from 'react'

function Persons({ persons, nameFilter }) {
  return (
    <div>
      {
        persons
        .filter((person)=> person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map((person) => <p key={ person.name }>{ person.name } {person.number }</p>)
      }
    </div>
  )
}

export default Persons
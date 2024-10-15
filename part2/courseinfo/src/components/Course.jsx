import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{ course }</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      { part.name } { part.exercises }
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      { parts.map(part=> <Part key={ part.id } part={ part }/> ) }
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <strong>Total of {
      parts.reduce((acc, part) => acc + part.exercises, 0)
    } exercises</strong>
  )
}

function Course({ course }) {
  return (
    <div>
      <Header course={ course.name }/>
      <Content parts={ course.parts }/>
      <Total parts={ course.parts }/>
    </div>
  )
}

export default Course

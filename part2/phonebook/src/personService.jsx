import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getAllPersons = () => {
   const request = axios.get(`${baseUrl}/persons`)
   return request.then((response) => response.data)
}

const createPerson = newPerson => {
  const request = axios.post(`${baseUrl}/persons`, newPerson)
  return request.then((response) => response.data)
}

const updatePerson = (oldPerson, newPerson) => {
  const request = axios.put(`${baseUrl}/persons/${oldPerson.id}`, newPerson)
  return request.then(response=>response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/persons/${id}`)
  return request.then(response=>response.data)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }
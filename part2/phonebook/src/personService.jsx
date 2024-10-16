import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getAllPersons = () => {
   const request = axios.get(`${baseUrl}/persons`)
   return request.then((response) => response.data)
    //.catch((err) => console.log('getAllPersons error: ', err))
}

const createPerson = newPerson => {
  const request = axios.post(`${baseUrl}/persons`, newPerson)
  return request.then((response) => response.data)
    //.catch((err) => console.log('getOnePerson error: ', err));
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/persons/${id}`)
  return request.then(deletedPerson=>deletedPerson.data)
}

export default { getAllPersons, createPerson, deletePerson }
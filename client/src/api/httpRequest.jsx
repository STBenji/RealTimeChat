import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const api = '/api'

export const login = async (data) => {
  const URL = `${baseUrl}${api}/login`
  
  const response = await axios.post(URL, data)
  return response
}

export const register = async (data) => {
  const URL = `${baseUrl}${api}/register`
  
  const response = await axios.post(URL, data)
  return response
}
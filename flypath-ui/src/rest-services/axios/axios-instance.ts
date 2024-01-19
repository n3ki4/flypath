import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'http://localhost:5050/',
  withCredentials: true
})

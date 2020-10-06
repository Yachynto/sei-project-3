import axios from 'axios'

const withHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

// Threads
export const getThreads = () => {
  return axios.get('/api/threads')
}

// Auth
export const registerUser = formData => {
  return axios.post('/api/threads/register', formData, withHeaders())
}

export const loginUser = formData => {
  return axios.post('/api/threads/login', formData, withHeaders())
}
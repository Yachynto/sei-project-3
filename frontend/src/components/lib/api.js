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

export const createThread = formData => {
  return axios.post('/api/threads', formData, withHeaders())
}

export const getSingleThread = threadId => {
  return axios.get(`/api/threads/${threadId}`)
}

//  Replies
export const createReply = (id, formData) => {
  return axios.post(`/api/threads/${id}/replies`, formData, withHeaders())
}

// Auth
export const registerUser = formData => {
  return axios.post('/api/threads/register', formData)
}

export const loginUser = formData => {
  return axios.post('/api/threads/login', formData)
}
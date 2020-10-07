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

//  Replies
export const createReply = formData => {
  return axios.post('/threads/:id/replies/:replyId', formData, withHeaders())
}

// Auth
export const registerUser = formData => {
  return axios.post('/api/threads/register', formData)
}

export const loginUser = formData => {
  return axios.post('/api/threads/login', formData)
}
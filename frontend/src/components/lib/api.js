import axios from 'axios'

// threads
export const getThreads = () => {
  return axios.get('/api/threads')
}
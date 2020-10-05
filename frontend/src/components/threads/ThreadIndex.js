import React from 'react'
import ThreadCard from './ThreadCard'

import { getThreads } from '../lib/api'

class ThreadIndex extends React.Component {
  state = {
    threads: null
  }

  async componentDidMount() {
    const response = await getThreads()
    this.setState({
      threads: response.data
    })
    console.log(response.data)
  }

  render() {
    if ( !this.state.threads ) return null
    return (
      <div>
        { this.state.threads.map(thread => (
          <ThreadCard key={thread._id} {...thread} />
        ))}
      </div>
    )
  }





  
}

export default ThreadIndex
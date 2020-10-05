import React from 'react'

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
        Check the console
      </div>
    )
  }





  
}

export default ThreadIndex
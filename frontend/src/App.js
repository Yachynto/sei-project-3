import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'

import ThreadIndex from './components/threads/ThreadIndex'
import Register from './components/auth/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/threads" component={ThreadIndex} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'

import ThreadIndex from './components/threads/ThreadIndex'
import ThreadCreate from './components/threads/ThreadCreate'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Profile from './components/common/Profile'
import ProfileUpdate from './components/common/ProfileUpdate'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/threads/create" component={ThreadCreate} />
        <Route path="/threads" component={ThreadIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/editProfile" component={ProfileUpdate} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

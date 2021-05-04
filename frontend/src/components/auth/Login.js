import React from 'react'

import { Form, Button } from 'react-bootstrap'

import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const response = await loginUser(this.state.formData)
    setToken(response.data.token)
    this.props.history.push('/threads')
    window.location.reload()
    console.log(response)
    // const user = response.data.message.slice(13)
  }

  render() {
    const { email, password } = this.state.formData
    return (
      <Form onSubmit={this.handleSubmit} id="form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={password} onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    )
  } 
}
export default Login
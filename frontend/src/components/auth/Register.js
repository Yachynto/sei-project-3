import React from 'react'

import { registerUser } from '../lib/api'
import { Form, Button } from 'react-bootstrap'

class Register extends React.Component {
  state = {
    formData: {
      image: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      nationality: '',
      currentCountry: ''
    },
    errors: {}
  }
  
  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    const errors = {
      ...this.state.errors,
      [event.target.name]: ''
    }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await registerUser(this.state.formData)
      console.log(response)
      this.props.history.push('/login')
    } catch (err) {
      console.log(err.response.data.message)
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    const { image, username, email, password, passwordConfirmation, nationality, currentCountry } = this.state.formData
    return (
      <>
        <Form id="form">
          <Form.Group>
            <Form.File
              className="position-relative"
              required
              name="file"
              label="Image"
              onChange={this.handleChange}
              isInvalid={!!this.state.errors.file}
              feedback={this.state.errors.file}
              id="validationFormik107"
              feedbackTooltip
            />
          </Form.Group>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Choose a Password" />
          </Form.Group>
          <Form.Group controlId="formGroupPasswordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter Password" />
          </Form.Group>
          <Form.Group controlId="formGroupNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control type="text" placeholder="Enter Nationality" />
          </Form.Group>
          <Form.Group controlId="formGroupCurrentCountry">
            <Form.Label>Current Country</Form.Label>
            <Form.Control type="text" placeholder="Enter your current country" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    )
  }





  
}
export default Register
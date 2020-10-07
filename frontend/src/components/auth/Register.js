import React from 'react'

import { registerUser } from '../lib/api'
import { Form, Button, Figure } from 'react-bootstrap'

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
        <Form id="form" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={image}
              />
            </Figure>
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
            <Form.Control name="username" type="username" placeholder="Enter Username" value={username} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Choose a Password" value={password} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formGroupPasswordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="passwordConfirmation" type="password" placeholder="Re-enter Password" value={passwordConfirmation} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formGroupNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control name="nationality" type="text" placeholder="Enter Nationality" value={nationality} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formGroupCurrentCountry">
            <Form.Label>Current Country</Form.Label>
            <Form.Control name="currentCountry" type="text" placeholder="Enter your current country" value={currentCountry} onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </>
    )
  }





  
}
export default Register
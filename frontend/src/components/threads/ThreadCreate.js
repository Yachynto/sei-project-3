import React from 'react'

import { Form, Button } from 'react-bootstrap'
import { createThread } from '../lib/api'

class ThreadCreate extends React.Component {
  state = {
    formData: {
      title: '',
      message: '',
      createdBy: ''
    },
    errors: {}
  }

  //! createdBy field need to be 'read only' and showing the user that made the thread
  // componentDidMount() {
  //   const byUser = await
  // }

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
      const response = await createThread(this.state.formData)
      this.props.history.push(`/threads/${response.data._id}`)
    } catch (err) {
      console.log(err.response.data.message)
    }
    
  }

  render () {
    const { title, message, createdBy } = this.state.formData
    return (
      <Form id="form" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" placeholder="Enter title" value={title} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control name="message" as="textarea" rows="4" value={message} onChange={this.handleChange} />
        </Form.Group>

        {/* <Form.Control type="text" placeholder={reatedBy} readOnly /> */}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>By</Form.Label>
          <Form.Control name="createdBy" type="text" placeholder="Enter user" value={createdBy} onChange={this.handleChange} />
        </Form.Group>
        
        <Button id="submitButton" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }









  
}
export default ThreadCreate
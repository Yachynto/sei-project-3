import React from 'react'

import createReply from '../lib/api'

class ReplyCreate extends React.Component {
  state = {
    formData: {
      message: '',
      createdBy: ''
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
      const response = await createReply(this.state.formData)
      this.props.history.push(`/threads/:id/replies/${response.data._id}`)
    } catch (err) {
      console.log(err.response.data.message)
    }
    
  }

  render () {
      const { message, createdBy } = this.state.formData
    return (
      <Form id="form" onSubmit={this.handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control name="message" as="textarea" rows="4" value={message} onChange={this.handleChange} />
        </Form.Group>

        {/* <Form.Control type="text" placeholder={createdBy} readOnly /> */}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>By</Form.Label>
          <Form.Control name="createdBy" type="text" placeholder="Enter user" value={createdBy} onChange={this.handleChange} />
        </Form.Group>
        
        <Button id="submitButton" variant="primary" type="submit">
          Send Reply
        </Button>
      </Form>
    )
    )
  }









}
export default ReplyCreate
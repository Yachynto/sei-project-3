import React from 'react'

import ReplayCard from '../replies/ReplyCard'
import { createReply, getUser } from '../lib/api'

import Media from 'react-bootstrap/Media'
import { Nav, Form, Button } from 'react-bootstrap'

import { Collapse } from 'react-bootstrap'


class ThreadCard extends React.Component {
  state = {
    isOpen: false,
    repliesOpen: false,
    formData: {
      title: '',
      message: '',
      createdBy: {
        username: '',
        userImage: ''
      }
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await getUser()
      this.setState({
        formData: {
          createdBy: res.data
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = async () => {
    try {
      const response = await createReply(this.props._id, this.state.formData)
      console.log(response)
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  toggleState = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  toggleRepliesState = event => {
    event.preventDefault()
    if (!this.state.isOpen) {
      this.setState({
        repliesOpen: !this.state.repliesOpen,
        isOpen: this.state.isOpen
      })
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
        repliesOpen: !this.state.repliesOpen
      })
    }
  }

  // handleReply = createReply => {
  //   createReply.preventDefault()
  // }


  render() {
    // console.log(this.props)
    const { message } = this.state.formData
    const { isOpen, repliesOpen } = this.state
    const { username } = this.state.formData.createdBy
    return (
      <>
        <div className="threadBox" onClick={this.handleClick}>
          <div>
            <div
              onClick={this.toggleState}
              aria-controls="example-collapse-text"
              aria-expanded={isOpen}
            >
              <Media>
                <div id={this.props._id}>
                  <div>
                    <img
                      width={64}
                      height={64}
                      className="mr-3"
                      src={this.state.formData.createdBy.userImage}
                      alt="user pic"
                    />
                    <Media.Body>
                      <h5>{this.props.title}</h5>
                      <p>{this.props.message}</p>
                      <p>by {username}</p>
                    </Media.Body>
                  </div>
                </div>
              </Media>
            </div>
            <Nav.Link href={`threads/${this.props._id}/replyCreate`} className="replyButton" onClick={this.toggleRepliesState}>Reply</Nav.Link>
          </div>
          
        </div>
        <Collapse in={isOpen}>
          <div id="example-collapse-text" className="threadBox">
            <div>
              { this.props.replies.map(reply => (
                <ReplayCard key={reply._id} {...reply} />
              ))}
            </div>
          </div>
        </Collapse>
        <Collapse in={repliesOpen}>
          <div id="example-collapse-text" className="threadBox">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control name="message" as="textarea" rows="4" value={message} onChange={this.handleChange} />
              </Form.Group>

              {/* <Form.Control type="text" placeholder={createdBy} readOnly /> */}

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder={username} readOnly />
              </Form.Group>
              
              <Button id="submitButton" variant="primary" type="submit">
                Send Reply
              </Button>
            </Form>
          </div>
        </Collapse>
      </>
    )
  }
  
}
export default ThreadCard
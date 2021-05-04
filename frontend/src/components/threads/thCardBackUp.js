import React from 'react'

import ReplayCard from '../replies/ReplyCard'
import RecordCard from '../records/RecordCard'
import AudioUpload from '../records/AudioUpload'

import { createReply, createRecord, getUser } from '../lib/api'

import Media from 'react-bootstrap/Media'
import { Nav, Form, Button } from 'react-bootstrap'

import { Collapse } from 'react-bootstrap'


class ThreadCard extends React.Component {
  state = {
    isOpen: false,
    repliesOpen: false,
    recordsOpen: false,
    cloudiURL: '',
    profile: '',
    formData: {
      title: '',
      audio: '',
      message: ''
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await getUser()
      this.setState({
        profile: res.data
      })
      // console.log(res.data)
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

  handleAudioChange = url => {
    const formData = { ...this.state.formData, audio: url }
    this.setState({ formData })
    console.log('handlechange')
  }

  handleSubmit = async () => {
    try {
      const response = await createReply(this.props._id, this.state.formData)
      console.log(response)
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  audioSubmit = async () => {
    try {
      const response = await createRecord(this.props._id, this.state.formData)
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
        isOpen: this.state.isOpen,
        recordsOpen: false
      })
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
        repliesOpen: !this.state.repliesOpen,
        recordsOpen: false
      })
    }
  }
  
  toggleRecordsState = event => {
    event.preventDefault()
    if (!this.state.isOpen) {
      this.setState({
        recordsOpen: !this.state.recordsOpen,
        isOpen: this.state.isOpen,
        repliesOpen: false
      })
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
        recordsOpen: !this.state.recordsOpen,
        repliesOpen: false
      })
    }
  }

  // handleReply = createReply => {
  //   createReply.preventDefault()
  // }


  render() {
    const { message } = this.state.formData
    const { isOpen, repliesOpen, recordsOpen } = this.state
    const { username, userImage } = this.props.owner
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
                      src={userImage}
                      alt="user pic"
                    />
                    <Media.Body>
                      <h5 className="threadTitle">{this.props.title}</h5>
                      <p>{this.props.message}</p>
                      <p className="threadUsername">by {username}</p>
                    </Media.Body>
                  </div>
                </div>
              </Media>
            </div>
            <div className="replyChoice">
              <Nav.Link href={`threads/${this.props._id}/replyCreate`} className="replyButton" onClick={this.toggleRepliesState}>Reply</Nav.Link>
              <Nav.Link href={`threads/${this.props._id}/reCordCreate`} className="replyButton" onClick={this.toggleRecordsState}>Record</Nav.Link>
            </div>
          </div>
          
        </div>
        <Collapse in={isOpen}>
          <div id="example-collapse-text" className="threadBox">
            <div>
              { this.props.replies.map(reply => (
                <ReplayCard key={reply._id} {...reply} />
              ))}
            </div>
            <div>
              { this.props.records.map(record => (
                <RecordCard key={record._id} {...record} />
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

              {/* <Form.Control type="text" placeholder={owner} readOnly /> */}

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder={this.state.profile.username} readOnly />
              </Form.Group>
              
              <Button id="submitButton" variant="primary" type="submit">
                Send Reply
              </Button>
            </Form>
          </div>
        </Collapse>

        <Collapse in={recordsOpen}>
          <div id="example-collapse-text" className="threadBox">
            <Form onSubmit={this.audioSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Record an audio</Form.Label>
                <AudioUpload onChange={this.handleAudioChange} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder={this.state.profile.username} readOnly />
              </Form.Group>
              
              <Button id="submitButton" variant="primary" type="submit">
                Send Audio
              </Button>
            </Form>
          </div>
        </Collapse>
      </>
    )
  }
  
}
export default ThreadCard
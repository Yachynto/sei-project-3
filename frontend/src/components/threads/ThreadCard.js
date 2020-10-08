import React from 'react'

import ReplayCard from '../replies/ReplyCard'
import Media from 'react-bootstrap/Media'

import { Collapse } from 'react-bootstrap'


class ThreadCard extends React.Component {
  state = {
    isOpen: false
  }

  toggleState = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    return (
      <>
        <div
          onClick={this.toggleState}
          aria-controls="example-collapse-text"
          aria-expanded={isOpen}
        >
          <Media>
            <div id={this.props._id} className="threadBox">
              <div>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src={this.props.image}
                  alt="user pic"
                />
                <Media.Body>
                  <h5>{this.props.title}</h5>
                  <p>{this.props.message}</p>
                  <p>{this.props.createdBy}</p>
                </Media.Body>
              </div>
            </div>
          </Media>
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
        
      </>
    )
  }
  
}
export default ThreadCard
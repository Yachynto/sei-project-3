import React from 'react'

import { Nav } from 'react-bootstrap'
import Media from 'react-bootstrap/Media'

const ThreadCard = ({ image, _id, title, message, createdBy }) => {
  return (
    <Media>
      <div id={_id} className="threadBox">
        <Nav.Link href={`/threads/${_id}`} >
          <img
            width={64}
            height={64}
            className="mr-3"
            src={image}
            alt="user pic"
          />
          <Media.Body>
            <h5>{title}</h5>
            <p>{message}</p>
            <p>{createdBy}</p>
          </Media.Body>
        </Nav.Link>
      </div>
    </Media>
  )
}

export default ThreadCard
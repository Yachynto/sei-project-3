import React from 'react'

import Media from 'react-bootstrap/Media'

const ReplyCard = ({ image, _id, message, username }) => {
  return (
    <Media>
      <div
        id={_id}
        className="replyBox"
      >
        <div >
          <img
            width={64}
            height={64}
            className="mr-3"
            src={image}
            alt="user pic"
          />
          <Media.Body>
            <p>{message}</p>
            <p>{username}</p>
          </Media.Body>
        </div>
      </div>
    </Media>
  )
}

export default ReplyCard
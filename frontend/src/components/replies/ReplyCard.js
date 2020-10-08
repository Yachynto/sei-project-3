import React from 'react'

import Media from 'react-bootstrap/Media'

const ReplyCard = ({ image, _id, message, createdBy }) => {
  return (
    <Media>
      <button
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
            <p>{createdBy}</p>
          </Media.Body>
        </div>
      </button>
    </Media>
  )
}

export default ReplyCard
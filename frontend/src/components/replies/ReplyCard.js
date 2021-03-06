import React from 'react'

import Media from 'react-bootstrap/Media'

const ReplyCard = ({ _id, message, owner }) => {
  return (
    <Media>
      <div
        id={_id}
        className="replyBox"
      >
        <div className="replyMedia">
          <img
            width={64}
            height={64}
            className="mr-3 replyImageLogo"
            src={owner.userImage}
            alt="user pic"
          />
          <Media.Body>
            <p className="replyMessage">{message}</p>
            <p className="replyOwner">{owner.username}</p>
          </Media.Body>
        </div>
      </div>
    </Media>
  )
}

export default ReplyCard
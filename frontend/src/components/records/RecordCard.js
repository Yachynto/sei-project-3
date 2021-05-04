import React from 'react'

import Media from 'react-bootstrap/Media'

const RecordCard = ({ _id, audio, owner }) => {
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
            <audio style={{ width: 200, marginTop: '15px', marginBottom: '-8px' }} src={audio} controls>
              <track kind='captions'></track>
            </audio>
            <p className="replyOwner">{owner.username}</p>
          </Media.Body>
        </div>
      </div>
    </Media>
  )
}

export default RecordCard
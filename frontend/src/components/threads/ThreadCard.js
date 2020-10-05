import React from 'react'

const ThreadCard = ({ _id, title, message, createdBy }) => {
  return (
    <div id={_id} className="threadBox">
      <div className="title">
        <h4>{title}</h4>
      </div>
      <div className="message">{message}</div>
      <div className="createdBy">Created by {createdBy}</div>
    </div>
  )
}

export default ThreadCard
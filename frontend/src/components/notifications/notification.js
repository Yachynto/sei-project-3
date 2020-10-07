//! register and login toast

//? Create a post overlay

// TODO + crate on hover

import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Button, Tooltip, Image } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'


const CreateThreadHover = () => {
  return (
    <Nav.Link
      href="/threads/create"
      className="createThread"
    >
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">Create a new Thread</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="dark"
            {...triggerHandler}
            className="d-inline-flex align-items-center"
          >
            <Image
              ref={ref}
              roundedCircle
            />
            <span>✚</span>
          </Button>
        )}
      </OverlayTrigger>
    </Nav.Link>
    
  )
}
export default CreateThreadHover
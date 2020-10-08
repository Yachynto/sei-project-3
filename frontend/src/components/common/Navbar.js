import React from 'react'

import { Nav, NavDropdown, Navbar, Image } from 'react-bootstrap'
import { logout, isAuthenticated } from '../lib/auth'
import CreateThreadHover from '../notifications/notification'
import SemiosphereLab from '/Users/giacinto/development-ga/SEI50/projects/sei-project-3/frontend/src/styles/images/SemiosphereLab.png'

const Navigation = () => {

  const handleLogout = () => {
    logout()
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Image className="imageLogo" roundedCircle src={SemiosphereLab} />
      <Navbar.Brand href="/">Semiosphere Lab</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/threads">Threads</Nav.Link>
        </Nav>
        <Nav>
          { isAuthenticated() && <CreateThreadHover />}
          <NavDropdown 
            title={ !isAuthenticated() ? 'Join' : 'User' }
            id="collasible-nav-dropdown">
            { !isAuthenticated() && <NavDropdown.Item href="/register">Register</NavDropdown.Item> }
            { !isAuthenticated() && <NavDropdown.Item href="/login">Login</NavDropdown.Item> }
            { isAuthenticated() && <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> }
            { isAuthenticated() && <NavDropdown.Divider /> }
            { isAuthenticated() && <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item> }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Navigation
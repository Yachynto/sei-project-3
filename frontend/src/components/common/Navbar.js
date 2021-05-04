import React from 'react'

import { Nav, NavDropdown, Navbar, Image } from 'react-bootstrap'
import { logout, isAuthenticated } from '../lib/auth'
import { getUser } from '../lib/api'
import CreateThreadHover from '../notifications/notification'
import SemiosphereLab from '../../styles/images/SemiosphereLab.png'

class Navigation extends React.Component {
  state = {
    profile: ''
  }

  async componentDidMount() {
    
    if (isAuthenticated()) {
      const res = await getUser()
      this.setState({
        profile: res.data
      })
    } else this.setState({ profile: 'user' })
    // console.log(res.data)
    
  }
  

  handleLogout = () => {
    logout()
  }
  render() {
    const { username } = this.state.profile
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
              title={ !isAuthenticated() ? 'Join' : `${username}` }
              id="collasible-nav-dropdown">
              { !isAuthenticated() && <NavDropdown.Item href="/register">Register</NavDropdown.Item> }
              { !isAuthenticated() && <NavDropdown.Item href="/login">Login</NavDropdown.Item> }
              { isAuthenticated() && <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> }
              { isAuthenticated() && <NavDropdown.Divider /> }
              { isAuthenticated() && <NavDropdown.Item href="/" onClick={this.handleLogout}>Logout</NavDropdown.Item> }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
} 
  
export default Navigation
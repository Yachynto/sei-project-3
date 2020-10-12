import React from 'react'

import { getUser, userEdit } from '../lib/api'

import ImageEdit from './ImageEdit'

import { Form, Button } from 'react-bootstrap'

class Profile extends React.Component {
  state = {
    profile: {
      userImage: '',
      username: '',
      email: '',
      nationality: '',
      currentCountry: ''
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await getUser()
      this.setState({
        profile: res.data
      })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.profile)
  }

  handleImageChange = url => {
    const profile = { ...this.state.profile, userImage: url }
    this.setState({ profile })
  }

  handleChange = event => {
    const profile = {
      ...this.state.profile,
      [event.target.name]: event.target.value
    }
    const errors = {
      ...this.state.errors,
      [event.target.name]: ''
    }
    this.setState({ profile, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await userEdit(this.state.profile)
      this.props.history.push('/profile')
      console.log(response)
    } catch (err) {
      console.log(err.response.data.message)
      this.setState({ errors: err.response.data.errors })
    }
  }


  render() {
    const { userImage, username, email, nationality, currentCountry } = this.state.profile
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src={userImage} alt="Admin" width="150" />
                      <ImageEdit 
                        onChange={this.handleImageChange}
                      />
                      <div className="mt-3">
                        <h4>{username}</h4>
                        <p className="text-secondary mb-1">{nationality}</p>
                        <p className="text-muted font-size-sm">Living in {currentCountry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h5 className="align-items-center text-center">Change Your Info</h5>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Username</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input type="text" name="username" value={username} onChange={this.handleChange}/>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input type="text" name="email" value={email} onChange={this.handleChange}/>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Nationality</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input type="text" name="nationality" value={nationality} onChange={this.handleChange}/>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Current Country</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input type="text" name="currentCountry" value={currentCountry} onChange={this.handleChange}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card-body">
                    <Button variant="primary" type="submit">Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      
    )
  }
}
export default Profile
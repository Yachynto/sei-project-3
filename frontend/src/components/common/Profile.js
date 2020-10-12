import React from 'react'

import { getUser } from '../lib/api'

class Profile extends React.Component {
  state = {
    profile: 'null'
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


  render() {
    const { userImage, username, email, nationality, currentCountry } = this.state.profile
    return (
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={userImage} alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{username}</h4>
                      <p className="text-secondary mb-1">{nationality}</p>
                      <p className="text-muted font-size-sm">Living in {currentCountry}</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nationality</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {nationality}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Current Country</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {currentCountry}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card-body">
                  <a className="d-flex align-items-center mb-3" href="/editProfile" style={{ textDecorationLine: 'none' }}>Edit Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Profile
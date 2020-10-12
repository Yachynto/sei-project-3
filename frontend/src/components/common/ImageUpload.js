import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class ImageUpload extends React.Component {
  state = {
    image: null
  }
  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    try {
      const res = await axios.post(uploadUrl, data)
      this.setState({
        image: res.data.secure_url
      })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.image !== this.state.image) {
      this.props.onChange(this.state.image)
    }
  }
  render() {
    const { image } = this.state
    return (
      <>
        {image ?
          <div style={{ width: '200px' }} name="image">
            <img src={image} alt="uploaded" name="image" value="image" style={{ width: '100%', height: 'auto' }}/>
          </div>
          :
          <>
            <label name="image" value="image" className="label">Upload Image</label>
            <br></br>
            <input
              className="input"
              type="file"
              onChange={this.handleUpload}
              name="image"
            />
          </>
        }
      </>
    )
  }
}
export default ImageUpload
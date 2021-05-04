import React from 'react'

// const uploadUrl = process.env.AUDIO_REACT_APP_CLOUDINARY_URL
// const uploadPreset = process.env.AUDIO_REACT_APP_CLOUDINARY_UPLOAD_PRESET


const audioType = 'audio/webm'

class AudioUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recording: false,
      fileStuff: {
        audios: [],
        blobs: []
      },
      audioStatePath: null
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.audioStatePath !== this.state.audioStatePath) {
      this.props.onChange(this.state.audioStatePath)
    }
  }

  async startRecording(e) {
    e.preventDefault()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    // show it to user
    this.audio.srcObject = stream
    //TODO To see if it's better autoPlay or not
    // this.audio.play()
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: audioType
    })
    // init data storage for audio chunks
    this.chunks = []
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data)
      }
    }
    // wipe old data chunks
    this.chunks = []
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10)
    // say that we're recording
    this.setState({ recording: true })
  }

  stopRecording(e) {
    e.preventDefault()
    // stop the recorder
    this.mediaRecorder.stop()
    // say that we're not recording
    this.setState({ recording: false })
    // save the audio to memory
    this.saveAudio()
  }

  saveAudio() {
    // convert saved chunks to blob
    const audioBlob = new Blob(this.chunks, { type: audioType })
    // generate audio url from blob
    const audioURL = window.URL.createObjectURL(audioBlob)
    // const newPair = this.state.fileStuff.blobs.concat([audioBlob, audioURL])
    // append audioURL to list of saved audios for rendering
    const audios = this.state.fileStuff.audios.concat([audioURL])
    // const blobs = this.state.fileStuff.blobs.concat([audioBlob])
    this.setState({
      fileStuff: { audios }
    })
    // console.log(this.state.fileStuff)
    var fd = new FormData()

    //? Upload
    fd.append('file', audioBlob)
    fd.append('upload_preset', 'AudioPreset')
    fd.append('resource_type', 'video')

    fetch('https://api.cloudinary.com/v1_1/yachynto/video/upload',
      {
        method: 'POST',
        body: fd
      }
    )
      .then(async r => {
        const data = await r.json()
        this.setState({
          audioStatePath: data.secure_url
        })
        // console.log('cloudinary url:', data.secure_url)
        // console.log('cloudinary url:', data)
        console.log('from state', this.state.audioStatePath)
        return data.secure_url
      })
  }

  deleteAudio(audioURL) {
    // filter out current audioURL from the list of saved audios
    const audios = this.state.fileStuff.audios.filter(a => a !== audioURL)
    this.setState({ fileStuff: { audios: audios } })
    console.log('DELETED', audioURL)
  }

  checkData(e) {
    console.log(e, 'clicked')
  }

  checkState(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const { recording, fileStuff } = this.state
    return (
      <div className="camera">
        <audio
          style={{ width: 400 }}
          ref={a => {
            this.audio = a
          }}>
          <track kind='captions'></track>
          Video stream not available.
        </audio>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Start</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        {/* <div>
          <button onClick={e => this.checkState(e)}>Check State</button>
        </div> */}
        <div>
          {fileStuff.audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio style={{ width: 200 }} src={audioURL} controls>
                <track kind='captions'></track>
              </audio>
              <div>
                <button onClick={() => this.deleteAudio(audioURL)}>Delete</button>
                {/* <a href={audioURL}>Download</a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default AudioUpload
import React from 'react'

import { Carousel } from 'react-bootstrap'
import chattingPep from '../../styles/images/chattingPep.jpeg'
import joinUs from '../../styles/images/joinUs.jpeg'
import joinUs2 from '../../styles/images/joinUs2.png'
// import crowd from '../../styles/images/crowd.jpeg'

const CarouselSlide = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 slideFirst"
          src={joinUs}
          alt=""
        />
        <Carousel.Caption>
          <h3 className="title">Welcome to Semiosphere Lab</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 slideSecond"
          src={chattingPep}
          alt=""
        />
        <Carousel.Caption>
          <div className="title">
            <h3>Ask anyone, Answer anyone</h3>
            <p>Make a thread with a question, gets replies or reply with your opinion to another user</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 slideThird"
          src={joinUs2}
          alt=""
        />
        <Carousel.Caption>
          <div className="title">
            <h3>Get curious</h3>
            <p>Learn new expressions everyday</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselSlide
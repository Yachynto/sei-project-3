import React from 'react'

import { Carousel } from 'react-bootstrap'

const CarouselSlide = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt=""
        />
        <Carousel.Caption>
          <h3 className="title">Welcome to Semiosphere Lab</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
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
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
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
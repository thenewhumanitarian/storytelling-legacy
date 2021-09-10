import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Slider from 'react-slick'
import Slide from 'react-reveal/Slide'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

export default class SlideChangeHooks extends Component {
  state = {
    activeSlide: 0,
    userHasClicked: false,
    windowWidth: window.innerWidth
  }

  constructor(props) {
    super(props)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount() {
    console.log(this.state.windowWidth)
    window.addEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({
      windowWidth: window.innerWidth
    })
  }

  render() {
    const { activeSlide } = this.state
    const { data } = this.props

    const settings = {
      focusOnSelect: true,
      dots: false,
      infinite: true,
      speed: 250,
      slidesToShow: this.state.windowWidth > 500 ? (data.length > 2 ? 3 : 2) : 1,
      // slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      beforeChange: (current, next) => this.setState({ activeSlide: -1 }),
      afterChange: current =>
        this.setState({ activeSlide: current, typistDone: false })
    }

    return (
      <div>
        <div className={'video-slider-container'}>
          {this.state.activeSlide > -1 && (
            <Slide center>
              <ReactPlayer
                url={data[activeSlide].VideoURL}
                playing={this.state.userHasClicked}
                playIcon={this.state.userHasClicked}
                // light={data[activeSlide].QuotePhoto}
                playsInline
                width={'100%'}
                height={'56.25vw'}
                controls={false}
              />
            </Slide>
          )}
        </div>
        <Slider {...settings} className={'video-slider'}>
          {data.map((el, i) => (
            <div className={'slide-container unselectable'}>
              <div
                style={{
                  height: 0,
                  paddingTop: '100%',
                  position: 'relative',
                  width: 'auto'
                }}
                onClick={() => this.setState({ userHasClicked: true })}
              >
                <img
                  key={i}
                  alt={el.FirstName + ' ' + el.LastName}
                  src={el.QuotePhoto}
                  style={{ cursor: 'pointer' }}
                  width={'100%'}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <span className={'name-box'}>
                  <h3>
                    {el.Firstname} {el.Lastname}
                  </h3>
                  <p>{el.Role}</p>
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

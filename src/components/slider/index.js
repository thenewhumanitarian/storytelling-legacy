// @flow

import * as React from 'react'
import * as _ from 'underscore'

import Helmet from 'react-helmet'

import Papa from 'papaparse'
import Slider from 'react-slick'
import renderHTML from 'react-render-html'

import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/segment.css'
import 'semantic-ui-css/components/header.css'
import 'semantic-ui-css/components/icon.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './styles.scss'

type Props = {
  match: Object
}

type State = {
  data: Object,
  isLoading: boolean,
  timestamp: number,
  arrowOffsetY: number
}

const INITIAL_STATE = {
  data: {},
  timestamp: new Date().getTime(),
  isLoading: true,
  arrowOffsetY: 0
}

function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        top: props.offsetY / 2 + 'px'
      }}
      onClick={onClick}
    />
  )
}

function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        top: props.offsetY / 2 + 'px'
      }}
      onClick={onClick}
    />
  )
}

class SliderComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.fetchData = this.fetchData.bind(this)
    this.setData = this.setData.bind(this)
  }

  componentWillMount() {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  setData(response) {
    console.log(response)
    this.setState({
      allData: response,
      isLoading: false
    })
  }

  fetchData() {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${this.props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: data => {
          this.setData(data.data)
        }
      }
    )
  }

  render() {
    const SLIDER_SETTINGS = {
      dots: window.innerWidth > 500,
      infinite: true,
      speed: 250,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: this.props.match.params.adaptiveHeight === 'dynamic',
      nextArrow: <NextArrow offsetY={this.state.arrowOffsetY} />,
      prevArrow: <PrevArrow offsetY={this.state.arrowOffsetY} />
    }

    const { allData } = this.state
    const mappedGraphics = _.map(allData, (slide, index) => (
      <div
        className={`single-slide-container ${index}`}
        key={`slider-${index}`}
      >
        <Helmet>
          <base target={'_parent'} />
        </Helmet>
        <div style={{ position: 'relative' }}>
          <img
            className={`graphic-image ${
              this.props.match.params.size === 'full-size' ? 'full-size' : ''
            }`}
            src={slide.graphic || slide.image}
            alt={slide.title}
            ref={el => (this.imgEl = el)}
            onLoad={() =>
              this.setState({ arrowOffsetY: this.imgEl.offsetHeight })
            } // print 150
          />
          {slide.credit && (
            <div className={'photo-credit'}>
              <span>{slide.credit}</span>
            </div>
          )}
        </div>
        <div
          className={`media-element-container slide-details ${this.props.match.params.background}`}
          style={{ maxWidth: 'unset', padding: '1rem' }}
        >
          {slide.title && <h3 className='graphic-title'>{slide.title}</h3>}
          <div className={'graphic-text'}>
            {renderHTML(slide.text)}
            {slide.link && (
              <a
                href={
                  // slide.link.split('#')[0] === document.referrer ? slide.link.split('#')[1] : slide.link
                  // slide.link.startsWith('#') ?  document.referrer + slide.link : slide.link
                  slide.link
                }
                target={'_parent'}
                className='read-more-link no-select'
              >
                <i className='no-select ui icon long arrow right' />
                <strong>Read more</strong>
              </a>
            )}
          </div>
        </div>
      </div>
    ))
    return (
      <div
        data-iframe-height='true'
        id={'slider-component'}
        className={`${
          this.props.match.params.options === 'inverted' ? 'inverted' : ''
        }`}
        style={{ position: 'relative' }}
      >
        {this.state.isLoading && (
          <div className='ui very basic segment full-height'>
            <div className='ui active inverted dimmer'>
              <div className='ui text loader'>Loading..</div>
            </div>
          </div>
        )}
        {!this.state.isLoading && (
          <div>
            <div
              className={`slider-container ${
                this.props.match.params.options === 'no-border'
                  ? 'no-border'
                  : ''
              }`}
            >
              <Slider {...SLIDER_SETTINGS}>{mappedGraphics}</Slider>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SliderComponent

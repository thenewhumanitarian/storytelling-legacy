import React, { Component } from 'react'
import Slider from 'react-slick'
// import Slide from 'react-reveal/Slide'
import styled from 'styled-components'
import FlipCardCard from '../flipcards/card'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/icon.css'
import '../../css/animations.scss'

const StyledDiv = styled.div`
	.preview-slide {
		.slick-list > .slick-track > .slick-slide > div > div {
			display: inline-flex !important;
			align-items: center;
			justify-content: center;
		}
		&:hover {
			cursor: pointer;
		}
	}
`

const ButtonContainer = styled.div`
	width: 100%;
	margin: 1rem auto;
	text-align: center;
`

const PreviewSlideText = styled.div`
	background: rgba(230,230,230,.5);
	text-align: center;
	min-height: 80px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
`

const LegendText = styled.p`
		color: #999999;
		margin: 0;
		padding: 0;
	`

export default class FlipcardSliderComponent extends Component {
	state = {
		activeSlide: 0,
		userHasClicked: false,
		nav1: null,
		nav2: null,
		isFlipped: false
	}

	constructor(props) {
		super(props)
		this.nextSlide = this.nextSlide.bind(this)
		this.prevSlide = this.prevSlide.bind(this)
		this.goToSlide = this.goToSlide.bind(this)
		this.flipCard = this.flipCard.bind(this)
	}

	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		})
	}

	nextSlide (index) {
		this.setState({
			isFlipped: false
		})
		this.slider1.slickGoTo(this.state.activeSlide + 1);
		this.slider2.slickGoTo(this.state.activeSlide + 1);
	}

	prevSlide (index) {
		this.setState({
			isFlipped: false
		})
		this.slider1.slickGoTo(this.state.activeSlide - 1);
		this.slider2.slickGoTo(this.state.activeSlide - 1);
	}

	goToSlide (index) {
		this.setState({
			isFlipped: false
		})
		this.slider1.slickGoTo(index)
		this.slider2.slickGoTo(index)
	}

	flipCard () {
		this.setState({
			isFlipped: !this.state.isFlipped
		})
	}

	render() {
		const { data } = this.props;

		const settings = {
			// focusOnSelect: true,
			dots: false,
			infinite: true,
			speed: 250,
			centerMode: true,
			centerPadding: '0',
			slidesToScroll: 1,
			fade: true,
			draggable: false,
			// beforeChange: (current, next) => this.setState({activeSlide: next}),
			// afterChange: (current, next) => this.setState({activeSlide: current})
		};

		const settings2 = {
			focusOnSelect: true,
			dots: false,
			infinite: true,
			speed: 50,
			centerMode: true,
			centerPadding: '0',
			slidesToScroll: 3,
			draggable: true,
			beforeChange: (current, next) => this.setState({activeSlide: next}),
			// afterChange: (current, next) => this.setState({activeSlide: current})
		};

		return (
			<StyledDiv id={'slider-component'}>

				<ButtonContainer>
					<button
						className={'ui massive basic icon button'}
						onClick={() => this.prevSlide()}
					>
						<i className={'icon long arrow left'}/>
					</button>
					<button
						onClick={() => this.nextSlide()}
						className={'ui massive basic icon button'}
					>
						<i className={'icon long arrow right'}/>
					</button>
					<LegendText style={{marginBottom: '1.5rem'}}>
						{this.state.activeSlide + 1} / {data.length}
					</LegendText>
				</ButtonContainer>

				<Slider
					asNavFor={this.state.nav1}
					ref={slider => (this.slider2 = slider)}
					slidesToShow={3}
					swipeToSlide={true}
					centerMode={true}
					centerPadding={0}
					focusOnSelect={true}
					arrows={false}
					className={'preview-slide'}
					{...settings2}
				>
					{data.map((el, i) => (
						<PreviewSlideText
							key={`preview-slide-${i}`}
							onClick={() => {
								console.log(i)
								this.goToSlide(i)
							}}
						>
							<h2>{ el.title }</h2>
						</PreviewSlideText>
					))
					}
				</Slider>

				<Slider
					slidesToShow={1}
					asNavFor={this.state.nav2}
					className={'flipcard-slider main'}
					arrows={false}
					swipeToSlide={false}
					draggable={false}
					ref={slider => (this.slider1 = slider)}
					activeSlide={this.state.activeSlide}
					{...settings}
				>
					{data.map((el, i) => (
						<FlipCardCard
							key={`flipcardcard-${i}`}
							index={i}
							activeSlide={this.state.activeSlide}
							isFlipped={this.state.isFlipped}
							data={el}
							flipHandler={() => this.flipCard()}
						/>
					))}
				</Slider>

				<ButtonContainer>
					<LegendText>
						{this.state.activeSlide + 1} / {data.length}
					</LegendText>
					<button
						className={'ui massive basic icon button'}
						onClick={() => this.prevSlide()}
					>
						<i className={'icon long arrow left'}/>
					</button>
					<button
						onClick={() => this.nextSlide()}
						className={'ui massive basic icon button'}
					>
						<i className={'icon long arrow right'}/>
					</button>
				</ButtonContainer>
			</StyledDiv>
		);
	}
}
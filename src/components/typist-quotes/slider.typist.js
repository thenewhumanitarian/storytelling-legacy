import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Typist from 'react-typist';
import Slide from 'react-reveal/Slide';
import ReactAudioPlayer from 'react-audio-player'

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "react-typist/dist/Typist.css";

import "./styles.scss";

const SlideChangeHooks = (props) => {
	const [activeSlide, setActiveSlide] = useState(0)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const data = props.data

	const settings = {
		focusOnSelect: true,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: windowWidth > 500 ? 3 : 2,
		centerMode: true,
		slidesToScroll: 1,
		// beforeChange: (current, next) => setActiveSlide(-1),
		afterChange: current => {
			setTimeout(() => {
				setActiveSlide(current)
			}, 0)
		}
	}

	useEffect(() => {
		// console.log(this.state.windowWidth);
		window.addEventListener("resize", setWindowWidth(window.innerWidth))
	}, [])

	return (
		<div>
			<div className={`typist-container ${props.options === 'grey' ? 'grey' : ''}`}>
				{activeSlide === -9 &&
				<Typist>
					<Typist.Delay ms={800} />
				</Typist>
				}
				{activeSlide > -1 &&
				<Slide
					center
					key={Math.random()}
				>
					<a
						style={{
							position: 'relative',
							pointerEvents: data[activeSlide].LinkedArticle ? 'auto' : 'none',
							textDecoration: 'none'
						}}
						className={'read-more-link'}
						rel="noopener noreferrer"
						target={'_parent'}
						href={data[activeSlide].LinkedArticle}
					>
						<Typist
							avgTypingDelay={60}
						>
							<Typist.Delay ms={200} />
							{data[activeSlide].Quote}
							<Typist.Delay ms={800} />
						</Typist>
						<div className={'Typist placeholder'}>
							<span>{props.data[activeSlide].Quote}</span>
						</div>
					</a>
					{props.data[activeSlide].LinkedArticle &&
						<h3>
							<a
								className={'read-more'}
								href={props.data[activeSlide].LinkedArticle}
								rel="noopener noreferrer"
								target={'_parent'}
							>
								Read more →
							</a>
						</h3>
					}
				</Slide>
				}
			</div>
			<Slider {...settings} className={'quote-slider'} centerMode={true}>
				{data.map((el, i) => (
					<div
						key={`slide-container-${i}`}
						className={'slide-container unselectable'}
					>
						<div style={{height: 0, paddingTop: '100%', position: 'relative', width: 'auto'}}>
							<img
								key={i}
								alt={el.FirstName + ' ' + el.LastName}
								src={el.QuotePhoto}
								style={{cursor: 'pointer'}}
								width={'100%'}
							/>
						</div>
						<div style={{textAlign: 'center', marginTop: '1rem'}}>
							<div className={'name-box'}>
								<h3
									style={{
										fontFamily: "Roboto, sans-serif"
									}}
								>
									{el.Firstname} {el.Lastname}
								</h3>
								{el.QuoteAudio && activeSlide === i &&
								<ReactAudioPlayer
									src={`${el.QuoteAudio}`}
									autoPlay={false}
									controls
								/>
								}
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default SlideChangeHooks

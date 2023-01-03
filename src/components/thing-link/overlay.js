// @flow
import React from 'react'
import renderHTML from 'react-render-html'
import { isMobile } from 'react-device-detect'

import styled from 'styled-components'

const StyledDiv = styled.div`
	background: white;
	width: 80%;
	max-width: 700px;
	margin: 0 auto;
	padding: 1rem;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 7777;
	// -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
	// -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
	// box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

	.grid {
		@media screen and (max-width: 500px) {
			// padding-bottom: 2rem;
		}
	}

	hr {
		display: none;
		@media screen and (max-width: 500px) {
			display: block;
		}
	}

	a {
		color: #a03c50;
		text-decoration: none;
		font-weight: 500;

		&:hover {
			text-decoration: underline
		}
	}

	@media screen and (max-width: 500px) {
		padding: 0;
		width: 100%;
		position: relative;
		transform: translate(-50%, -0%);
		background: rgba(230, 230, 230, 0.5);
	}

	.overlay-component {
		font-family: 'Roboto', sans-serif;
		font-size: calc(10px + 2vmin);
		color: black;
		margin: 0 auto;
		align-items: center;
		justify-content: center;
		position: relative;
		-webkit-box-shadow: 0 10px 6px 10px #292929;
		-moz-box-shadow: 0 10px 6px 10px #292929;
		box-shadow: 0 10px 6px -6px #777;
	}
	.thinglink-lead {
		font-weight: 700;
		padding-right: 2.5rem;
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}
	i.close-icon {
		text-shadow: 2px 2px 22px rgba(255, 255, 255, 1);
		position: absolute;
		display: block;
		top: 8px;
		right: -4px;
		font-size: 2rem;
		color: #c92e41;
		z-index: 9999;

		&:hover {
			cursor: pointer;
		}

		@media screen and (max-width: 500px) {
			top: 10px;
			right: 0;
		}
	}
`

const OverlayComponent = (props) => {
	const hasImage = props.data.image !== ''
	const { data } = props

	return (
		<StyledDiv className={'overlay-container'}>
			<div className={'overlay-component'} style={{ zIndex: 9999 }}>
				<i onClick={props.closeHandler} className={'icon remove close-icon'} />
				<div className={`ui ${isMobile ? 'stackable' : 'unstackable'} basic grid`}>
					{hasImage && (
						<a
							style={{
								verticalAlign: 'top',
								backgroundImage: `url(${props.data.image})`,
								backgroundPosition: 'center center',
								backgroundSize: 'cover',
							}}
							className={'six wide column no-border'}
							href={data.link}
							target={'_parent'}
						>
							<img style={{ opacity: 0 }} src={props.data.image} alt={props.data.title} />
						</a>
					)}
					<div className={`${hasImage ? 'ten' : 'sixteen'} wide column flow`}>
						{data.title && <h3>{renderHTML(data.title)}</h3>}
						{data.lead && <p>{renderHTML(data.lead)}</p>}
						{data.text && <p className={'thinglink-text'}>{renderHTML(data.text)}</p>}
						{data.link !== '' && (
							<p>
								{data.linkText !== '' ? (
									<>
										Read more →{' '}
										<a href={data.link} target={'_parent'}>
											{data.linkText !== '' ? data.linkText : 'Read more →'}
										</a>
									</>
								) : (
									<>
										<a href={data.link} target={'_parent'}>
											→ Read more
										</a>
									</>
								)}
							</p>
						)}
					</div>
				</div>
			</div>
		</StyledDiv>
	)
}

export default OverlayComponent

import React from "react";
import styled from 'styled-components'

const StyledDiv = styled.div`
	border-radius: 22px;
	width: auto;
	// display: inline-block;
	
	p, h1, h2, h3 {
		color: white;
	}
	h2, h3 {
		margin-bottom: 1.3rem;
	}
	p:last-child {
		margin-bottom: 0;
	}
	.photo-credit {
		line-height: 1.1;
		margin-top: 0.5rem;
    color: rgba(255,255,255,0.8);
	}
	.photo-container {
		width: 100%;
		height: 0;
		padding-top: 56.25%;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			object-fit: cover;
			object-position: center center;
		}
	}
`

const ImageBubble = (props) => {
	return (
		<StyledDiv className={'image-bubble'}>
			<a
				href={props.link}
				target={'_blank'}
				rel={'noopener noreferrer'}
			>
				<h2>{props.title}</h2>
				<div className={'photo-container'}>
					<img alt='Article teaser'
					     src={props.photo}
					     width={'100%'}
					/>
				</div>
				<p className={'photo-credit'}>Photo: {props.credit}</p>
			</a>
		</StyledDiv>
	)
}

export default ImageBubble;

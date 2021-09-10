import React from "react";
import styled from 'styled-components'
import renderHTML from 'react-render-html'

const StyledDiv = styled.div`
	border-radius: 22px;
	width: auto;
	// display: inline-block;

	p, h1, h2, h3 {
		color: white;
		font-size: 1.6rem;
		line-height: 1.25;
		@media screen and (max-width: 479px) {
			font-size: 1.4rem;
		}
	}
	a {
		font-weight: 700;
		border-bottom: 2px solid white;
		&:hover {
			background: white;
			color: #9f3e52; 
		}
	}
	h2, h3 {
		margin-bottom: 1.5rem;
	}
	p:last-child {
		margin-bottom: 0;
	}
	.photo-credit {
		line-height: 1.4;
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

const RichText = (props) => {
	return (
		<StyledDiv className={'rich-text'}>
			{renderHTML(props.text)}
		</StyledDiv>
	)
}

export default RichText;

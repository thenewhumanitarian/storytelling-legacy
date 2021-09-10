import React from 'react'
import styled from 'styled-components'
import renderHTML from 'react-render-html'

import '../../css/animations.scss'

function FlipCardCard (props) {

	const FlipButtonContainer = styled.div`
	width: 100%;
	margin: 1rem auto;
	text-align: center;
`
	const TextContainer = styled.div`
		max-width: 700px;
		margin: 0 auto;
		font-family: 'Roboto', sans-serif;
		p {
			line-height: 1.7;
			font-size: 1.6rem;	
			margin-bottom: 2rem;
		}
		h2 {
			margin: 1em auto;
			font-size: 2.1rem;
			line-height: 1.25;
		}
	`
	const FlipcardWrapper = styled.div`
		width: 100%;
		margin: 0;
		position: relative;
		.card-inner {
			img {
				margin: 0 auto;
			}
		}
		*.inactive {
			opacity: 0;
			display: none;
		}
	`
	// const showGreyBox = props.data.titleA !== "" || props.data.titleB !== "" || props.data.textA !== "" || props.data.textB !== ""

	return (
		<FlipcardWrapper>

			<div className={`card-inner front`}><img src={props.data.imageA} alt={'Flipcard Side A'} /></div>
			{props.data.imageB !== '' &&
			<div className={`card-inner back ${!props.isFlipped ? 'inactive' : ''}`} style={{position: 'absolute', top: 0, left: 0}}><img src={props.data.imageB} alt={'Flipard Side B'} /></div>
			}

			<FlipButtonContainer>
				<button
					style={{opacity: props.data.imageB !== '' ? 1 : 0}}
					onClick={() => props.flipHandler()}
					className={`ui massive ${props.isFlipped ? '' : 'basic'} black icon button`}><i className={'icon rotate-center redo alternate'}
				/>
					&nbsp;Flip
				</button>
			</FlipButtonContainer>

			{props.activeSlide === props.index &&
			<TextContainer style={{display: 'none'}}>
				<div className={`${props.isFlipped ? 'inactive' : ''}`}>
					<h2>{renderHTML(props.data.titleA)}</h2>
					<div>
						{renderHTML(props.data.textA)}
					</div>
				</div>
				<div className={`${!props.isFlipped ? 'inactive' : ''}`}>
					<h2>{renderHTML(props.data.titleB)}</h2>
					<div>
						{renderHTML(props.data.textB)}
					</div>
				</div>
			</TextContainer>
			}

		</FlipcardWrapper>
	)
}

export default FlipCardCard
// @flow

import React, { useState } from 'react'
import renderHTML from 'react-render-html'

import 'semantic-ui-css/components/icon.css'
import './styles.scss'

const EventComponent = (props) => {
	const [isOpen, setIsOpen] = useState(props.collapsed !== 'collapsed')

	return (
		<div
			className={`event-tile flow ${props.type === 'by-title' ? 'by-title' : ''}`}
			style={{
				display: props.data.visible === '' ? 'none' : 'block',
			}}
			onClick={() => {
				if (props.collapsed) {
					setIsOpen(!isOpen)
				}
			}}
		>
			<h2 className={'event-title bold'}>
				{renderHTML(props.data.title)}
				{props.collapsed && <i className={`icon chevron ${isOpen ? 'up' : 'right'}`} />}
			</h2>
			{props.data.description && isOpen && <p className={'event-description'}>{renderHTML(props.data.description)}</p>}
			{props.data.link !== '' && (
				<a href={props.data.link} target={'_blank'} rel={'noopener noreferrer'} className={'read-more'}>
					Read more →
				</a>
			)}
			{props.data.video !== '' && (
				<a
					href={props.data.video}
					target={'_blank'}
					rel={'noopener noreferrer'}
					style={{
						display: 'table',
						paddingTop: '1rem',
						textAlign: 'left',
					}}
				>
					Go to video
					<i className={'icon long arrow right'} />
				</a>
			)}
			{props.data.image !== '' && (
				<a href={props.data.link} target={'_blank'} rel={'noopener noreferrer'} className={'image-link'}>
					<img alt={props.data.title} className={'timeline-image'} src={props.data.image} />
				</a>
			)}
		</div>
	)
}

export default EventComponent

// @flow

import * as React from 'react'
import renderHTML from 'react-render-html'
import Bounce from 'react-reveal/Bounce'

import 'semantic-ui-css/components/icon.css'
import './styles.scss'
import {useState} from "react";

const EventComponent = (props) => {
	const [isOpen, setIsOpen] = useState(props.collapsed !== 'collapsed')

	return (
		<Bounce left>
			<div
				className={'event-tile flow'}
				style={{display: props.data.visible === '' ? 'none' : 'block'}}
				onClick={() => {if(props.collapsed) {setIsOpen(!isOpen)}}}>
				{props.data.title &&
				<h3>
					{renderHTML(props.data.title)}{props.collapsed && <i className={`icon chevron ${isOpen ? 'up' : 'right'}`} />}
				</h3>
				}
				{props.data.description && isOpen &&
				<p>{renderHTML(props.data.description)}</p>
				}
				{ props.data.link !== '' &&
				<a href={props.data.link}
				   target={'_blank'}
				   rel={'noopener noreferrer'}
				   className={'read-more'}
				>
					Read more →
				</a>
				}
				{ props.data.video !== '' &&
				<a href={props.data.video}
				   target={'_blank'}
				   rel={'noopener noreferrer'}
				   style={{
					   display: 'table',
					   paddingTop: '1rem',
					   textAlign: 'left'
				   }}
				>
					Go to video<i className={'icon long arrow right'} />
				</a>
				}
				{ props.data.image !== '' &&
				<a
					href={props.data.link}
					target={'_blank'}
					rel={'noopener noreferrer'}
					className={'image-link'}
				>
					<img alt={props.data.title} className={'timeline-image'} src={props.data.image} />
				</a>
				}
			</div>
		</Bounce>
	)
}

export default EventComponent

// @flow

import * as React from 'react'
import EventComponent from './event'

import './styles.scss'

const YearComponent = (props) => {
	const mappedYear = props.data.map((event,i) => (
		<EventComponent
			index={i}
			bounce={props.index % 2 !== 0 ? 'left' : 'right'}
			data={event}
			collapsed={props.collapsed}
			type={'by-year'}
		/>
	))
	return (
		<div style={{position: 'relative'}}>
			<h1 className={'year-text'}>{ props.data[0].year }</h1>
			{ mappedYear }
		</div>
	)
}

export default YearComponent

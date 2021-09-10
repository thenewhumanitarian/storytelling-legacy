import React, { useState } from 'react'
import ContentContext from './content-context'

const ContentContextProvider = ({ children }) => {
	const setContentDetails = ({
		                        active,
														journey,
														data,
	                        }) => {
		updatecontentDetails(prevState => {
			const newState = {
				...prevState,
				active: active || prevState.active,
				journey: journey || prevState.journey,
				data: data || prevState.data
			}
			return newState
		})
	}

	const contentState = {
		active: 0,
		journey: [0],
		data: [],
		setContentDetails
	}

	const [contentDetails, updatecontentDetails] = useState(contentState)

	return (
		<ContentContext.Provider value={contentDetails}>
			{children}
		</ContentContext.Provider>
	)
}

export default ContentContextProvider
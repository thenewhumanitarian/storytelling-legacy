import React, { useState } from 'react'
import ContentContext from './content-context'

const ContentContextProvider = ({ children }) => {
	const setContentDetails = ({
		                        active,
														hover,
														data,
	                        }) => {
		updatecontentDetails(prevState => {
			const newState = {
				...prevState,
				hover: hover || [-1],
				active: active || prevState.active,
				data: data || prevState.data
			}
			return newState
		})
	}

	const contentState = {
		active: -1,
		hover: [-1],
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
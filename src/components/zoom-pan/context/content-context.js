import { createContext } from 'react'

const ContentContext = createContext({
	setContentDetails: contentDetails => {}
})

export default ContentContext
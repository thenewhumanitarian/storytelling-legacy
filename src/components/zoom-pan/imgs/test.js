import React, { useContext } from "react"
import ContentContext from '../context/content-context';

import data from '../data/example-data'

import './test.scss'

function TestGraphic(props) {
	const {
		hover,
		setContentDetails
	} = useContext(ContentContext)

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100vh"
			viewBox="0 0 1920 1080"
		>
			<g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
				<path fill="transparent" d="M0 0H1920V1080H0z"></path>
				<g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
					<path fill="transparent" d="M0 0H1920V1080H0z"></path>
					<path
						fill="#D8D8D8"
						d="M81 129H907V494H81z"
						className={hover.includes(0) ? 'active' : ''}
						onMouseEnter={() => setContentDetails({hover: data[0].highlight})}
						onMouseLeave={() => setContentDetails({hover: [-1]})}
						onClick={() => {
							setContentDetails({ active: 1 })
						}}
					/>
					<path
						fill="#D8D8D8"
						d="M81 586H907V951H81z"
						className={hover.includes(1) ? 'active' : ''}
						onMouseEnter={() => setContentDetails({hover: data[1].highlight})}
						onMouseLeave={() => setContentDetails({hover: [-1]})}
						onClick={() => {
							setContentDetails({ active: 2 })
						}}
					/>
					<path
						fill="#D8D8D8"
						d="M1013 129H1839V494H1013z"
						className={hover.includes(2) ? 'active' : ''}
						onMouseEnter={() => setContentDetails({hover: data[2].highlight})}
						onMouseLeave={() => setContentDetails({hover: [-1]})}
						onClick={() => {
							setContentDetails({ active: 3 })
						}}
					/>
					<path
						fill="#D8D8D8"
						d="M1013 586H1839V951H1013z"
						className={hover.includes(3) ? 'active' : ''}
						onMouseEnter={() => setContentDetails({hover: data[3].highlight})}
						onMouseLeave={() => setContentDetails({hover: [-1]})}
						onClick={() => {
							setContentDetails({ active: 4 })
						}}
					/>
					<text
						fill="#000"
						fontFamily="GTSectraFine-Bold, GT Sectra Fine"
						fontSize="85"
						fontWeight="bold"
					>
						<tspan x="390.395" y="342">
							Box 1
						</tspan>
					</text>
					<text
						fill="#000"
						fontFamily="GTSectraFine-Bold, GT Sectra Fine"
						fontSize="85"
						fontWeight="bold"
					>
						<tspan x="386.825" y="799">
							Box 2
						</tspan>
					</text>
					<text
						fill="#000"
						fontFamily="GTSectraFine-Bold, GT Sectra Fine"
						fontSize="85"
						fontWeight="bold"
					>
						<tspan x="1321.057" y="342">
							Box 3
						</tspan>
					</text>
					<text
						fill="#000"
						fontFamily="GTSectraFine-Bold, GT Sectra Fine"
						fontSize="85"
						fontWeight="bold"
					>
						<tspan x="1318.253" y="799">
							Box 4
						</tspan>
					</text>
				</g>
			</g>
		</svg>
	);
}

export default TestGraphic;

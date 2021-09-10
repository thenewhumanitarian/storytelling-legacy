import React, { useContext, useEffect } from "react"
import ContentContext from './context/content-context';
import renderHTML from 'react-render-html';

// import data from './data/example-data'

import './overlay.scss'

function ContentOverlay(props) {
	const {
		active,
		data,
		setContentDetails
	} = useContext(ContentContext)


	useEffect(() => {
		setContentDetails({data: props.data})
	}, [props.data, setContentDetails])

	return (
		<div
			className={'overlay-wrapper'}
			style={{display: active > -1 ? 'block' : 'none'}}
		>
			{active > -1 && data[active - 1].title &&
			<h1>
				{ data[active - 1].title }
			</h1>
			}
			{active > -1 && data[active - 1].subtitle &&
			<h2 style={{
				margin: '1em auto 1em',
				fontSize: '2.1rem',
				lineHeight: 1.25
			}}
			>
				{ renderHTML(data[active - 1].subtitle) }
			</h2>
			}
			{active > -1 && data[active - 1].text &&
			<p style={{
			 	marginTop: '2rem',
				fontSize: '1.6rem',
				lineHeight: 1.7,
				marginBottom: '2rem',
				fontFamily: 'Roboto, sans-serif'
			}}>
				{ renderHTML(data[active - 1].text) }
			</p>
			}
			{active > -1 && data[active - 1].image &&
			<img
				alt={'event xyz'}
				src={data[active - 1].image}
				width={'280px'}
				style={{margin: '2rem 0'}}
			/>
			}
			<br />
			<a href={'https://www.thenewhumanitarian.org'}>Link 1</a>, <a href={'https://www.thenewhumanitarian.org'}>Link 2</a>, <a href={'https://www.thenewhumanitarian.org'}>Link 3</a>
			<span
				className={'close-button'}
				onClick={() => setContentDetails({
					active: -1
				})}
			>
				<i className={'icon red big remove'} />
			</span>
		</div>
	);
}

export default ContentOverlay;

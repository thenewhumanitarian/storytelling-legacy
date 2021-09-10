// @flow

import * as React from 'react'
import renderHTML from 'react-render-html'

import 'semantic-ui-css/components/segment.css'
import 'semantic-ui-css/components/loader.css'
import 'semantic-ui-css/components/dimmer.css'
import './styles.scss'

type Props = {
	match: Object
}

type State = {
	data: Object,
	isLoading: boolean,
	timestamp: number,
	text: string
}

const INITIAL_STATE = {
	data: {},
	timestamp: new Date().getTime(),
	isLoading: true,
	text: '',
	quoteId: 0
}

class QuoteComponent extends React.Component<Props,State> {
	constructor (props) {
		super(props)
		this.state = INITIAL_STATE
		this.fetchQuote = this.fetchQuote.bind(this)
		this.loopQuote = this.loopQuote.bind(this)
	}
	componentWillMount () {
		window.iFrameResizer = {
			heightCalculationMethod: 'taggedElement'
		}
	}
	componentDidMount () {
		this.fetchQuote()
	}
	fetchQuote () {
		console.log('⬇ Fetching')
		fetch('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10')
			.then(res => res.json())
			.then(data =>
				this.setState({
					data: data,
					isLoading: false,
					timestamp: new Date().getTime(),
					text: data[0].content
				})
			)
			.then(() => console.log('🐨 New quotes loaded'))
	}
	loopQuote () {
		this.setState({
			quoteId: Math.floor(Math.random() * 9) + 1
		})
	}
	render () {
		const { data } = this.state
		return (
			<div
				id={'quote-component'}
				data-iframe-height
				style={{position: 'relative'}}
				onClick={ this.fetchQuote }
			>
				{this.state.isLoading &&
					<div className='ui very basic segment full-height'>
						<div className='ui active inverted dimmer'>
							<div className='ui text loader'>
								Loading..
							</div>
						</div>
					</div>
				}
				{!this.state.isLoading &&
					<div>
						<div
							className={`quote-text orange-border`}
						>
							{ renderHTML(data[this.state.quoteId].content) }
						</div>
					</div>
				}
			</div>
		)
	}
}

export default QuoteComponent

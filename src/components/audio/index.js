// @flow

import * as React from 'react'
import AudioPlayer from 'react-h5-audio-player'

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
	timestamp: number
}

const INITIAL_STATE = {
	timestamp: new Date().getTime(),
	isLoading: false
}

class AudioComponent extends React.Component<Props,State> {
	constructor (props) {
		super(props)
		this.state = INITIAL_STATE
		console.log(this.props.match.params.src)
	}
	componentWillMount () {
		window.iFrameResizer = {
			heightCalculationMethod: 'taggedElement'
		}
	}
	render () {
		return (
			<div
				id={'audio-component'}
				className={this.props.match.params.options === 'inverted' ? 'inverted' : ''}
				data-iframe-height
				style={{position: 'relative'}}
				onClick={ this.fetchQuote }
			>
				{this.state.isLoading &&
					<div className='ui very basic segment full-height'>
						<div className='ui active inverted dimmer'>
							<div className='ui text loader'>
								Loading audio...
							</div>
						</div>
					</div>
				}
				{!this.state.isLoading &&
					<div>
						<div
							className={`audio-player`}
						>
							<AudioPlayer
								src={'https://media.thenewhumanitarian.org/' + this.props.match.params.src}
								controls
							/>
							<div className={'ui vertical center aligned very basic segment'}>
								<a
									target={'_blank'}
									rel={'noopener noreferrer'}
									href={'https://media.thenewhumanitarian.org/' + this.props.match.params.src}
								>
										<p><i className={'icon download'} />&nbsp;Download audio file</p>
								</a>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

export default AudioComponent

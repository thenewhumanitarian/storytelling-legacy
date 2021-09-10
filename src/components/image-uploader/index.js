// @flow

import * as React from 'react'
import ImageUploader from 'react-images-upload'

import 'semantic-ui-css/components/segment.css'
import 'semantic-ui-css/components/loader.css'
import 'semantic-ui-css/components/dimmer.css'
import './styles.scss'

type Props = {
	match: Object
}

type State = {
	isLoading: boolean,
	timestamp: number,
	pictures: string[]
}

const INITIAL_STATE = {
	timestamp: new Date().getTime(),
	isLoading: false,
	pictures: []
}

class ImageuploaderComponent extends React.Component<Props,State> {
	constructor (props) {
		super(props)
		this.state = INITIAL_STATE
		this.onDrop = this.onDrop.bind(this)
	}
	componentWillMount () {
		window.iFrameResizer = {
			heightCalculationMethod: 'taggedElement'
		}
	}
	onDrop(picture) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
		});
	}
	render () {
		return (
			<div
				id={'image-uploader'}
				data-iframe-height
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
				<ImageUploader
					withIcon
					withPreview
					buttonText='Choose images'
					onChange={this.onDrop}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
				/>
				}
			</div>
		)
	}
}

export default ImageuploaderComponent

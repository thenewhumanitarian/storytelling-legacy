// @flow

import * as React from 'react'
import './styles.scss'

type Props = { /* ... */ }

type State = {
	count: number,
}

class EmptyComponent extends React.Component<Props, State> {
	state = {
		count: 0,
	}
	
	componentDidMount() {
		setInterval(() => {
			this.setState(prevState => ({
				count: prevState.count + 1,
			}));
		}, 1000);
	}
	
	render() {
		return <div>Count: {this.state.count}</div>;
	}
}

export default EmptyComponent

// @flow

import * as React from 'react'

import Papa from 'papaparse'
import BasketSliderComponent from '../slider/slider.basket'

import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/message.css'
import 'semantic-ui-css/components/icon.css'
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
  data: {},
  timestamp: new Date().getTime(),
  isLoading: true
}

class AfricaDroughtComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  componentWillMount() {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${this.props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          this.setState({
            data: data
          })
        }
      }
    )
  }

  render() {
    const { data } = this.state
    return (
      <div data-iframe-height='true'>
        {this.state.data.length ? (
          <div>
            <BasketSliderComponent
              className={'typist-slider'}
              data={data.filter(el => el['#'])}
            />
          </div>
        ) : (
          <div className='ui very basic segment full-height'>
            <div className='ui active inverted dimmer'>
              <div className='ui big text loader'>Loading diary...</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AfricaDroughtComponent

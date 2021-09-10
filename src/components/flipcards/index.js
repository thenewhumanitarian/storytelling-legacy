// @flow
import * as React from 'react'

import Papa from 'papaparse'
import FlipcardSliderComponent from '../slider/slider.flipcards'

import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/message.css'
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

class FlipcardsComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5)
    return array
  }

  sortByID(array) {
    // array.sort = (a,b) => ( a.ID - b.ID )
    array.sort(function(a, b) {
      return a.id - b.id
    })
    return array
  }

  componentWillMount() {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }

    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSweMdPPS7hvlmGltKhNmPr-sv7gibJDa8engbf8cslDa9NVyC956pztu_qxJO9iAxpWXI402oe61pf/pub?output=csv',
      {
        download: true,
        header: true,
        complete: data => {
          this.setState({
            data: this.sortByID(data.data)
          })
          console.log(data.data)
        },
        simpleSheet: true
      }
    )
  }

  render() {
    const { data } = this.state
    return (
      <div
        id={'flipcard-wrapper'}
        data-iframe-height='true'
        style={{
          marginBottom: '2rem'
        }}
      >
        {this.state.data.length > 0 ? (
          <div>
            <FlipcardSliderComponent
              className={'flipcard-slider'}
              data={data.filter(el => el.online)}
            />
          </div>
        ) : (
          <div className='ui very basic segment full-height'>
            <div className='ui active inverted dimmer'>
              <div className='ui big text loader'>Loading data...</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default FlipcardsComponent

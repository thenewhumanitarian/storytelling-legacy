// @flow
import * as React from 'react'
import FlipcardCard from './card'
import Papa from 'papaparse'
// import renderHTML from "react-render-html";

const INITIAL_STATE = {
  data: [],
  timestamp: new Date().getTime(),
  isLoading: true
}

class FlipcardComponent extends React.Component {
  //new instance of this component
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5)
    return array
  }

  componentWillMount() {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }

    Papa.parse(
      'https://docs.google.com/spreadsheets/d/' +
        this.props.match.params.src +
        '/pub?output=csv',
      {
        download: true,
        header: true,
        complete: data => {
          this.setState({
            data: data.data
          })
          // console.log(data)
        },
        simpleSheet: true
      }
    )
  }

  render() {
    const { id } = this.props.match.params
    const { data } = this.state

    return (
      <div data-iframe-height={true}>
        {data.length > 0 ? (
          <div>
            <FlipcardCard
              data={data}
              id={id}
              options={this.props.match.params.options}
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

export default FlipcardComponent

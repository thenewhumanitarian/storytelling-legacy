import React, { useState, useEffect, useRef } from 'react'

// Importing Papaparse to pull data from Google Spreadsheet
import Papa from 'papaparse'

// Importing d3-array for grouping data by colour
import * as d3 from 'd3-array'
import { Table } from './Table'
import { Key } from './key'
import './index.css'

export const useComponentWillMount = func => {
  const willMount = useRef(true)
  if (willMount.current) func()
  willMount.current = false
}

function BubbleModalComponent(props) {
  const [data, setData] = useState([])

  useComponentWillMount(() => {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  })

  /* useEffect hook to pull data in when page loads */
  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: result => {
          /* This way the whole result from G Sheet would go to state: */
          /* setData(result); */
          /* d3-array has functions to group arrays */
          /* This here groups the result by color and writes it into new arrays (see console log) */
          const groupedData = Array.from(d3.group(result.data, d => d.color))
          // console.log(groupedData);
          /* Save the grouped array to data state: */
          setData(groupedData)
        }
      }
    )
  }, [props.match.params.src])

  return (
    <div data-iframe-height={true} className={'bubble-modal'}>
      {/* This way it renders the bubbles only if the data array has more than 0 entries, otherwise whos loading: */}
      <h1
        style={{
          textAlign: 'center',
          paddingTop: 80,
          paddingBottom: 20,
          display: 'none'
        }}
      >
        Which agencies measure carbon emissions?
      </h1>
      <div
        // className ="container"
        style={{
          display: 'block',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          margin: 'auto',
          alignItems: 'center'
        }}
      >
        <div>
          <Key />
        </div>
        {data.length > 0 ? (
          <div data-iframe-height={true} className='App'>
            <Table bubbles={data} />
          </div>
        ) : (
          <div className='ui very basic segment full-height'>
            <div className='ui active inverted dimmer'>
              <div className='ui text loader'>Loading data...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BubbleModalComponent

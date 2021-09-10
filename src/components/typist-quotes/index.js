// @flow

import React, { useState, useEffect, useRef } from 'react'

import Papa from 'papaparse'
import AsNavFor from './slider.typist'

import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/flag.css'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/message.css'
import './styles.scss'
// import Slider from "react-slick";

export const useComponentWillMount = func => {
  const willMount = useRef(true)
  if (willMount.current) func()
  willMount.current = false
}

const TypistQuotesComponent = props => {
  const [data, setData] = useState({})

  useComponentWillMount(() => {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  })
  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setData(shuffle(data))
        },
        simpleSheet: true
      }
    )
  }, [props.match.params.src])

  const shuffle = array => {
    array.sort(() => Math.random() - 0.5)
    return array
  }

  return (
    <div data-iframe-height='true'>
      {data.length > 0 ? (
        <div className={'typist-quote-wrapper'}>
          <div className={'gradient-left'} />
          <div className={'gradient-right'} />
          <AsNavFor
            options={props.match.params.options}
            className={'typist-slider'}
            data={data.filter(el => el['#'])}
          />
        </div>
      ) : (
        <div className='ui very basic segment full-height'>
          <div className='ui active inverted dimmer'>
            <div className='ui big text loader'>Loading quotes...</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TypistQuotesComponent

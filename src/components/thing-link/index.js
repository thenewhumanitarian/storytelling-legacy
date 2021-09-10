// @flow

import React, { useState, useEffect } from 'react'
import OverlayComponent from './overlay'
import renderHTML from 'react-render-html'
import Papa from 'papaparse'

import './styles.scss'

const ThingLinkComponent = props => {
  const [data, setData] = useState({
    data: {},
    timestamp: new Date().getTime(),
    isLoading: true,
    showOverlay: false,
    overlayData: []
  })

  useEffect(() => {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  }, [])

  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setData({
            ...data,
            allData: data,
            buttons: data.filter(el => el.type === 'button'),
            base: data.filter(el => el.type === 'base'),
            isLoading: false
          })
        }
      }
    )
  }, [props.match.params.src])

  const setOverlay = el => {
    setData({
      ...data,
      overlayData: el,
      showOverlay: true
    })
  }

  const { buttons, base, showOverlay } = data

  return (
    <div
      data-iframe-height
      id={'thinglink-component'}
      className={`${
        props.match.params.options === 'inverted' ? 'inverted' : ''
      }`}
      style={{ position: 'relative' }}
    >
      {data.isLoading ? (
        <div className='ui active white dimmer' style={{ minHeight: '150px' }}>
          <div className='ui text loader'>Loading</div>
        </div>
      ) : (
        <div>
          <div className={'ui text center aligned container'}>
            {base[0].text && (
              <div
                style={{
                  fontSize: '1.5rem',
                  lineHeight: '1.25',
                  margin: '.5rem auto'
                }}
              >
                {renderHTML(base[0].text)}
              </div>
            )}
          </div>
          <div className={'base-container'}>
            {base && (
              <img
                onClick={() => setData({ ...data, showOverlay: false })}
                alt='base layer, most likely a map'
                style={{ width: '100%' }}
                src={base[0].image}
              />
            )}
            {showOverlay && base[0].color !== '' && (
              <div
                onClick={() => setData({ ...data, showOverlay: false })}
                className={`dimmer ${base[0].color}`}
              />
            )}
            {buttons.map((el, i) => (
              <div
                className={`pulse-button absolute-button heartbeat ${el.color}`}
                key={`button-${i}`}
                style={{
                  left: el.coordX + '%',
                  top: el.coordY + '%',
                  position: 'absolute'
                }}
                onClick={() => setOverlay(el)}
              >
                {isNaN(el.icon) ? (
                  <i className={`icon ${el.icon}`} />
                ) : (
                  <p className={'circle-number'}>
                    <strong>{el.icon}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.showOverlay && (
        <OverlayComponent
          closeHandler={() => setData({ ...data, showOverlay: false })}
          data={data.overlayData}
        />
      )}
    </div>
  )
}

export default ThingLinkComponent

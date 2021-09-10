// import { geoMercator, geoPath } from "d3-geo";
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { ZoomContainer } from './zoom-container'
import { Stage } from './stage'
import ContentContextProvider from './context/content-context-provider'
import ContentOverlay from './overlay'
/* Load all possible infographics */
import TestGraphic from './imgs/test'
import AnniversaryGraphic from './imgs/anniversary-graphic'

import './styles.scss'

export default function ZoomPanComponent(props) {
  const [googleData, setGoogleData] = useState([])

  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setGoogleData(data)
        }
      }
    )
  }, [props.match.params.src])

  return (
    <div data-iframe-height>
      <ContentContextProvider>
        <div id={'zoom-pan'}>
          <div className={'stage-wrapper'}>
            <Stage width='100vw' height='100vh'>
              <ZoomContainer>
                {props.match.params.graphic === 'test' && (
                  <TestGraphic data={googleData} />
                )}
                {props.match.params.graphic === 'anniversary' && (
                  <AnniversaryGraphic data={googleData} />
                )}
              </ZoomContainer>
            </Stage>
          </div>
          {googleData.length > 0 && <ContentOverlay data={googleData} />}
        </div>
        {googleData.length <= 0 && (
          <div
            className='ui active inverted dimmer'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              overflow: 'hidden'
            }}
          >
            <div className='ui text loader'>Loading information...</div>
          </div>
        )}
      </ContentContextProvider>
    </div>
  )
}

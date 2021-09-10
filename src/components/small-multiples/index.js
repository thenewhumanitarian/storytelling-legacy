import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import ContentContextProvider from './context/content-context-provider'
import styled from 'styled-components'

/* Import the charts */
import LineChartsComponent from './charts/line-charts'

export default function SmallMultiplesComponent(props) {
  const [googleData, setGoogleData] = useState([])

  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setGoogleData(data)
        },
        simpleSheet: false
      }
    )
  }, [props.match.params.src])

  const StyledDiv = styled.div`
    display: block;
  `

  return (
    <StyledDiv data-iframe-height>
      <ContentContextProvider>
        {googleData.length <= 0 ? (
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
            <div className='ui text loader'>Loading data...</div>
          </div>
        ) : (
          <div id={'small-multiples--container'}>
            {props.match.params.type === 'linecharts' && (
              <LineChartsComponent googleData={googleData} />
            )}
          </div>
        )}
      </ContentContextProvider>
    </StyledDiv>
  )
}

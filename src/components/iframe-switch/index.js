// @flow

import React, { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'
import styled from 'styled-components'
import IframeResizer from 'iframe-resizer-react'

import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/flag.css'

const IframeSwitchComponent = props => {
  const [activeFrame, setActiveFrame] = useState(1)
  const [activeSrc, setActiveSrc] = useState('')
  let [data, setData] = useState(null)

  const iframeRef = useRef(null)

  useEffect(() => {
    Papa.parse(
      `https://docs.google.com/spreadsheets/d/${props.match.params.src}/pub?output=csv`,
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setData(data)
          changeFrame(data[0])
        }
      }
    )
  }, [props.match.params.src, setData])

  useEffect(() => {
    // This starts our dynamic iframe resizer which is needed for embedding in the CMS
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  }, [])

  const changeFrame = el => {
    setActiveFrame(el.id)
    setActiveSrc(el.iframeSrc)
  }

  const StyledDiv = styled.div`
    text-align: center;
    margin: 2rem auto;
  `

  const ButtonContainer = styled.div`
    margin: 0 auto 2rem auto;
  `

  const StyledButton = styled.button`
    border-radius: 0px !important;
    &.mint {
      background-color: #2db487 !important;
      color: white;
      border-color: #2db487 !important;
      &:hover {
        color: white;
      }
      &.basic,
      &.basic:hover {
        border-color: #2db487 !important;
        color: #2db487 !important;
        box-shadow: 0 0 0 1px #2db487 inset !important;
      }
    }
    &.orange {
      background-color: #f0781e !important;
      color: white;
      border-color: #f0781e !important;
      &:hover {
        color: white;
      }
      &.basic,
      &.basic:hover {
        border-color: #f0781e !important;
        color: #f0781e !important;
        box-shadow: 0 0 0 1px #f0781e inset !important;
      }
    }
    &.blue {
      background-color: #413c78 !important;
      color: white;
      border-color: #413c78 !important;
      &:hover {
        color: white;
      }
      &.basic,
      &.basic:hover {
        border-color: #413c78 !important;
        color: #413c78 !important;
        box-shadow: 0 0 0 1px #413c78 inset !important;
      }
    }
    &.burgundy {
      background-color: #9f3e52 !important;
      color: white;
      border-color: #9f3e52 !important;
      &:hover {
        color: white;
      }
      &.basic,
      &.basic:hover {
        border-color: #9f3e52 !important;
        color: #9f3e52 !important;
        box-shadow: 0 0 0 1px #9f3e52 inset !important;
      }
    }
  `

  return (
    <StyledDiv data-iframe-height>
      {data && (
        <ButtonContainer>
          {data.map(el => (
            <StyledButton
              key={`switch-button-${el.id}`}
              className={`ui big ${el.id === activeFrame ? '' : 'basic'} ${
                el.buttonColor
              } icon button`}
              onClick={() => changeFrame(el)}
              alt={el.buttonAltText}
            >
              {el.buttonIcon && (
                <i
                  className={`${el.buttonIcon}`}
                  style={{
                    paddingRight: '0.5rem'
                  }}
                />
              )}
              {el.buttonText}
            </StyledButton>
          ))}
        </ButtonContainer>
      )}
      {data && activeSrc !== '' && (
        <IframeResizer
          key={`iframe-${activeFrame}`}
          forwardRef={iframeRef}
          heightCalculationMethod='lowestElement'
          inPageLinks
          log
          src={activeSrc}
          style={{ width: '1px', minWidth: '100%' }}
        />
      )}
    </StyledDiv>
  )
}

export default IframeSwitchComponent

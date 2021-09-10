import React, { useState } from 'react'
import styled from 'styled-components'
import renderHTML from 'react-render-html'
import { isMobile } from 'react-device-detect'

import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/button.css'
import '../../css/animations.scss'

function FlipcardCard(props) {
  const [isFlipped, setIsFlipped] = useState(false)

  const FlipButtonContainer = styled.div`
    position: absolute;
    z-index: 9;
    top: -3rem;
    left: 0;
    width: 100%;
    margin: 1rem auto;
    text-align: center;
    button {
      border-radius: none;
      position: relative;
      span {
        font-family: 'Roboto', sans-serif;
      }
    }
  `

  const TextContainer = styled.div`
    background: rgba(230, 230, 230, 0.5);
    padding: 1rem;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    position: relative;

    h3:first-child {
      margin-top: 1rem;
    }

    p {
      &:first-child:not(:last-child) {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 1rem;
      }
    }

    *.inactive {
      opacity: 0;
      display: none;
    }

    &:empty {
      display: none;
    }
  `

  const FlipcardWrapper = styled.div`
    position: relative;
    margin: 0.5rem auto;

    .flip-container {
      perspective: 1000px;
      overflow: visible;
    }
    .flip-container.hover .flipper {
      transform: rotateY(180deg);
    }

    .flip-container,
    .front,
    .back {
      width: 100vw;
      // height: 100vh;
    }

    .flipper {
      transition: 0.6s;
      transform-style: preserve-3d;
      position: relative;
    }

    .front,
    .back {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }

    .front {
      z-index: 2;
      transform: rotateY(0deg);
      img {
        border: 6px solid #9f3e52;
      }
    }

    .back {
      transform: rotateY(180deg);
      img {
        border: 6px solid #9f3e52;
      }
    }
  `

  const StyledTitle = styled.div`
    margin: 0 auto 1em;
    font-size: 2.1rem;
    line-height: 1.25;
    font-family: 'gt sectra bold', serif;
  `

  const relevantData = props.data.filter(
    el => parseInt(el.id) === parseInt(props.id)
  )

  const showGreyBox =
    relevantData[0].titleA &&
    relevantData[0].titleB &&
    relevantData[0].textA &&
    relevantData[0].textB

  return (
    <div>
      {relevantData[0].title && (
        <StyledTitle>{relevantData[0].title}</StyledTitle>
      )}

      <FlipcardWrapper
        data-iframe-height='true'
        onMouseLeave={() => {
          if (!isMobile) {
            // console.log('mouseLeave trigger')
            setIsFlipped(false)
          }
        }}
      >
        <img
          src={relevantData[0].imageA}
          alt={'front side'}
          style={{
            opacity: 0,
            zIndex: -1,
            position: 'relative',
            top: 0,
            left: 0
          }}
        />

        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <div
            className={`flip-container ${isFlipped ? 'hover' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                setIsFlipped(!isFlipped)
              }
            }}
            onTouchStart={e => {
              if (!isMobile) {
                console.log('nothing happens onTouchStart')
                return
              }
              console.log('onTouchStart trigger')
              setIsFlipped(!isFlipped)
            }}
          >
            <div className={`flipper`}>
              <div className='front'>
                <img src={relevantData[0].imageA} alt={'front side'} />
              </div>

              <div className='back'>
                <img src={relevantData[0].imageB} alt={'back side'} />
              </div>
            </div>
          </div>
        </div>

        <TextContainer
          style={{
            background: showGreyBox ? 'rgba(230,230,230,.5)' : 'transparent'
          }}
        >
          <FlipButtonContainer>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className={`ui big ${
                props.isFlipped ? 'basic' : ''
              } black icon button`}
            >
              <i className={'icon rotate-center redo alternate'} />
              {!isFlipped ? (
                <span>&nbsp;{relevantData[0].labelA || 'Then'}</span>
              ) : (
                <span>&nbsp;{relevantData[0].labelB || 'Now'}</span>
              )}
            </button>
          </FlipButtonContainer>
          {showGreyBox && (
            <div className={`${isFlipped ? 'inactive' : 'flow'}`}>
              {relevantData[0].titleA && (
                <h3>{renderHTML(relevantData[0].titleA)}</h3>
              )}
              <p>{renderHTML(relevantData[0].textA)}</p>
            </div>
          )}
          {showGreyBox && (
            <div className={`${!isFlipped ? 'inactive' : 'flow'}`}>
              {relevantData[0].titleB && (
                <h3>{renderHTML(relevantData[0].titleB)}</h3>
              )}
              {relevantData[0].textB && (
                <p>{renderHTML(relevantData[0].textB)}</p>
              )}
            </div>
          )}
        </TextContainer>
      </FlipcardWrapper>
    </div>
  )
}

export default FlipcardCard

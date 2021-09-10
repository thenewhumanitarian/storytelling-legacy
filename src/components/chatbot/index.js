// @flow

import React from 'react'
// import React, { useEffect, useState } from "react";
import ChatBot from 'react-simple-chatbot'
import styled, { ThemeProvider } from 'styled-components'
import theme from './data/theme'

import ContentContextProvider from './context/content-context-provider'

/* Import different chat scenarios */
import exampleData from './data/example-data'
import africaDroughtObiData from './data/africa-drought-obi'

import './styles.scss'

const ChatbotComponent = props => {
  const StyledDiv = styled.div`
    * {
      font-family: 'Roboto', sans-serif;
    }

    .rsc-container {
      background-color: rgba(230, 230, 230, 0.5);
    }

    .rsc-content {
      // height: 75vh;
      overflow: auto;
      margin-top: 0;
    }

    .rsc-os {
      text-align: center;
    }

    .rsc-cs {
      display: inline-block;
      border-radius: 22px;
      width: auto;
      max-width: 75% !important ;
    }

    .rsc-ts-bubble {
      font-size: 1.6rem;
      max-width: 75%;

      @media screen and (max-width: 479px) {
        font-size: 1.4rem;
      }
    }

    .rsc-os-option-element {
      font-size: 1.6rem;
      font-weight: 700;
      background: white;
      color: #9f3e52;
      border: 1px solid #9f3e52;
      padding: 0.5rem 1rem;
      margin-bottom: 0.25rem;

      @media screen and (max-width: 479px) {
        font-size: 1.4rem;
      }

      &:hover {
        cursor: pointer;
      }
    }

    h2 {
      font-family: 'GT Sectra', serif;
      font-weight: 700;
    }

    .rsc-os-option-element {
      font-weight: 400;
    }

    .rsc-ts-bubble {
      line-height: 1.25;
    }

    .rsc-ts-image-container {
      min-width: 16px;
    }

    @media screen and (max-width: 500px) {
      height: 750px;
    }

    @media screen and (max-height: 700px) {
      height: 500px;
    }
  `

  const restartBot = () => {
    window.history.replaceState(
      null,
      'Drought Series Chatbot',
      '/chatbot/' + props.match.params.src + '/restart'
    )
    window.location.reload()
  }

  const customStyle = {
    background: '#9f3e52',
    maxWidth: '50%',
    color: 'white',
    marginLeft: '60px'
  }

  const RestartBotContainer = styled.div`
    display: block;
    position: absolute;
    right: 6rem;
    top: 1.5rem;
    z-index: 9999;
  `

  let scenario = exampleData

  if (props.match.params.src === 'africa-drought') {
    scenario = africaDroughtObiData
  }

  return (
    <StyledDiv data-iframe-height>
      <RestartBotContainer>
        <p onClick={() => restartBot()} className={'ui white icon button'}>
          <i className={'icon power off'} /> Reboot me
        </p>
      </RestartBotContainer>
      <ContentContextProvider>
        <ThemeProvider theme={theme}>
          <ChatBot
            avatarStyle={{
              width: '50px',
              height: '50px'
            }}
            footerStyle={{
              opacity: 0
            }}
            botAvatar={scenario.image}
            customStyle={customStyle}
            headerTitle={scenario.name}
            steps={scenario.steps}
            style={{
              fontSize: '15px',
              boxShadow: 'none',
              background: '#F3F3F3'
            }}
            width={'100%'}
            height={'100vh'}
          />
        </ThemeProvider>
      </ContentContextProvider>
    </StyledDiv>
  )
}

export default ChatbotComponent

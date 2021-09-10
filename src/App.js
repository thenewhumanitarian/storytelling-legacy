// @flow

import React from 'react'
import * as ROUTES from './constants/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import QuoteComponent from './components/quote'
import TimelineComponent from './components/timeline'
import SliderComponent from './components/slider'
import AudioComponent from './components/audio'
import ImageUploader from './components/image-uploader'
import VideoQuotesComponent from './components/video-quotes'
import TypistQuotesComponent from './components/typist-quotes'
import AfricaDroughtComponent from './components/africa-drought'
import ThingLinkComponent from './components/thing-link'
import MapComponent from './components/map'
import ZoomPanComponent from './components/zoom-pan'
import FlipcardsComponent from './components/flipcards'
import FlipcardComponent from './components/flipcard'
import ChatbotComponent from './components/chatbot'
import IframeSwitchComponent from './components/iframe-switch'
import SmallMultiplesComponent from './components/small-multiples'
import BubbleModalComponent from './components/bubble-modal'
import FloatingBubbles from './components/floating-bubbles'
// import InfographicStepsComponent from './components/infographic-steps'

import './css/src/main.scss'
import './App.scss'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_DEV_BASE_URL

const AppComponent = props => {
  return (
    <Router basename={baseURL}>
      <div>
        <Route
          path={`${ROUTES.PULLOUT_QUOTE}/:options?`}
          component={QuoteComponent}
        />
        <Route
          path={`${ROUTES.TIMELINE}/:src/:options?/:collapsed?`}
          component={TimelineComponent}
        />
        <Route
          path={`${ROUTES.SLIDER}/:src/:options?/:size?/:background?/:adaptiveHeight?`}
          component={SliderComponent}
        />
        <Route
          path={`${ROUTES.AUDIO}/:src/:options?`}
          component={AudioComponent}
        />
        <Route path={`${ROUTES.IMAGE_UPLOAD}`} component={ImageUploader} />
        <Route
          path={`${ROUTES.TYPIST_QUOTES}/:src/:options?`}
          component={TypistQuotesComponent}
        />
        <Route
          path={`${ROUTES.VIDEO_QUOTES}/:src/:options?`}
          component={VideoQuotesComponent}
        />
        <Route
          path={`${ROUTES.AFRICA_DROUGHT}/:src/:options?`}
          component={AfricaDroughtComponent}
        />
        <Route
          path={`${ROUTES.THING_LINK}/:src/:options?`}
          component={ThingLinkComponent}
        />
        <Route
          path={`${ROUTES.MAP}/:data?/:lat1?/:lng1?/:lat2?/:lng2?/:gsheetID?`}
          component={MapComponent}
        />
        <Route
          path={`${ROUTES.ZOOM_PAN}/:graphic?/:src?/`}
          component={ZoomPanComponent}
        />
        <Route
          path={`${ROUTES.FLIPCARDS}/:src?/:options?/:size?/:background?/:adaptiveHeight?`}
          component={FlipcardsComponent}
        />
        <Route
          path={`${ROUTES.FLIPCARD}/:src?/:id?/:options?`}
          component={FlipcardComponent}
        />
        <Route
          path={`${ROUTES.CHATBOT}/:src?/:options?/`}
          component={ChatbotComponent}
        />
        <Route
          path={`${ROUTES.IFRAME_SWITCH}/:src?/:options?/`}
          component={IframeSwitchComponent}
        />
        <Route
          path={`${ROUTES.SMALL_MULTIPLES}/:type?/:src?/:options?/`}
          component={SmallMultiplesComponent}
        />
        <Route
          path={`${ROUTES.FLOATING_BUBBLES}/:src?/:group?/:desktopCols?/:mobileCols?`}
          component={FloatingBubbles}
        />
        <Route
          path={`${ROUTES.BUBBLE_MODAL}/:src?`}
          component={BubbleModalComponent}
        />
      </div>
    </Router>
  )
}

export default AppComponent

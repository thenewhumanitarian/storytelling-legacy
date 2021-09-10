// @flow

import React, { useState, useEffect } from 'react'
import * as _ from 'underscore'
import Papa from 'papaparse'

import YearComponent from './year'
import SingleEventComponent from './singleEvent'

import 'semantic-ui-css/components/grid.css'
import './styles.scss'

const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const TimelineComponent = props => {
  const [data, setData] = useState({
    data: {},
    timestamp: new Date().getTime(),
    isLoading: true
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
          setDataFunc(data)
        }
      }
    )
  }, [props.match.params.src])

  const setDataFunc = data => {
    let dataByYear = _.groupBy(_.toArray(data), el => el.year)
    setData({
      ...data,
      dataByYear: dataByYear,
      allData: _.toArray(data.filter(el => el.visible !== '')),
      isLoading: false
    })
  }

  const { dataByYear, allData } = data
  const { options, collapsed } = props.match.params

  const mappedYears = _.map(dataByYear, (year, index) => (
    <div className={`year-container column ${index}`}>
      <span className={'line'} />
      <YearComponent data={year} collapsed={collapsed} index={index} />
    </div>
  ))

  const mappedYearsFiltered = _.map(dataByYear, (year, index) => (
    <div className={`year-container column ${index}`}>
      <span className={'line'} />
      <YearComponent data={year} collapsed={collapsed} />
    </div>
  ))

  const mappedEvents = _.map(allData, (event, index) => {
    return (
      <div className={`year-container single-event column ${index}`}>
        <h3 className={'year-text'}>
          {monthsFull[parseInt(event.month) - 1]} {event.year}
        </h3>
        <span className={'line'} />
        <SingleEventComponent
          data={event}
          visible={event.visible}
          collapsed={collapsed}
        />
      </div>
    )
  })

  const mappedTitle = _.map(allData, (event, index) => {
    let currentYear = ''
    let titleClassName = ''
    if (index === 0) {
      currentYear = event.year
      titleClassName = 'first-element'
    } else {
      let lastYear = allData[index - 1].year
      currentYear = event.year
      if (lastYear === currentYear) {
        currentYear = ''
      }
    }

    return (
      <div className={'line-left'}>
        {currentYear !== '' && (
          <h3 className={`title-centered ${titleClassName}`}>{currentYear}</h3>
        )}
        <SingleEventComponent
          data={event}
          visible={event.visible}
          collapsed={collapsed}
          type={'by-title'}
        />
      </div>
    )
  })

  return (
    <div
      id={'timeline-component'}
      className={props.match.params.options === 'inverted' ? 'inverted' : ''}
      data-iframe-height
      style={{ position: 'relative' }}
      layout='one-column'
    >
      {data.isLoading && (
        <div className='ui very basic segment full-height'>
          <div className='ui active inverted dimmer'>
            <div className='ui big text loader'>Loading timeline..</div>
          </div>
        </div>
      )}
      {!data.isLoading && !options && (
        <div>
          <div className={'timeline-container ui two column grid'}>
            {mappedYears}
          </div>
        </div>
      )}
      {!data.isLoading && options === 'by-year' && (
        <div>
          <div className={'timeline-container ui two column grid by-year'}>
            {mappedYears}
          </div>
        </div>
      )}
      {!data.isLoading && options === 'by-tags' && (
        <div>
          <div className={'timeline-container ui two column grid by-tags'}>
            {mappedYearsFiltered}
          </div>
        </div>
      )}
      {!data.isLoading && options === 'by-event' && (
        <div>
          <div className={'timeline-container ui two column grid'}>
            {mappedEvents}
          </div>
        </div>
      )}
      {!data.isLoading && options === 'by-title' && (
        <div>
          <div className={'timeline-container ui one column grid by-title'}>
            {mappedTitle}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimelineComponent

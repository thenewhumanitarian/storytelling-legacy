import React, { useState, useEffect, useRef } from 'react'

// Importing Papaparse to pull data from Google Spreadsheet
import Papa from 'papaparse'

// Imports animation library
import { motion } from 'framer-motion'

import './index.css'
import './animations.scss'
import renderHTML from 'react-render-html'

export const useComponentWillMount = func => {
  const willMount = useRef(true)
  if (willMount.current) func()
  willMount.current = false
}

function FloatingBubbles(props) {
  const [data, setData] = useState([])
  const [currentActive, setCurrentActive] = useState(-1)

  const { src, group, desktopCols, mobileCols } = props.match.params

  useComponentWillMount(() => {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  })

  /* useEffect hook to pull data in when page loads */
  useEffect(() => {
    Papa.parse(`https://docs.google.com/spreadsheets/d/${src}/pub?output=csv`, {
      download: true,
      header: true,
      complete: result => {
        const groupedData = result.data
        setData(groupedData)
      }
    })
  }, [src])

  let relevantData = data

  if (group !== 'all') {
    relevantData = data.filter(el => el.group === group)
  }

  const clickHandler = i => {
    setCurrentActive(i)
  }

  const colors = [
    '#DA5931',
    '#ECC172',
    '#195E7D',
    '#96B6C4',
    '#579FA1',
    '#DADFE5'
  ]

  const Loading = () => {
    return (
      <div className='ui very basic segment full-height'>
        <div className='ui active inverted dimmer'>
          <div className='ui text loader'>Loading...</div>
        </div>
      </div>
    )
  }

  const spin = {
    scale: [1, 1, 1.5, 1, 1.1],
    rotate: [0, 0, 10, -10, 0],
    borderRadius: ['50%', '12%', '50%', '15%', '50%'],
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)'
  }

  function CloseIcon() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={'fill-current inline w-10 h-10'}
        viewBox='0 0 100 100'
      >
        <path
          fillRule='evenodd'
          d='M49.941 32.113L75.562 6.492C87.25-5.196 105.195 12.75 93.39 24.437l-25.5 25.5 25.5 25.621c11.805 11.688-6.14 29.633-17.828 17.828l-25.621-25.5-25.5 25.5c-11.688 11.805-29.633-6.14-17.945-17.828l25.621-25.621-25.621-25.5C-5.192 12.749 12.754-5.196 24.441 6.492z'
        ></path>
      </svg>
    )
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const Bubble = ({ data, i, clickHandler }) => {
    return (
      <div
        className={`relative w-full h-0 bubble bubble-${i}`}
        style={{
          paddingTop: `${100}%`
        }}
        onClick={() => clickHandler(i)}
      >
        <div
          className={
            'absolute top-0 left-0 w-full h-full flex justify-center items-center'
          }
        >
          <motion.div
            className={`w-4/5 h-4/5 rounded-full flex justify-center items-center cursor-pointer relative`}
            style={{
              background:
                data.answered_everything === 'no'
                  ? colors[colors.length - 1]
                  : colors[getRandomInt(0, colors.length - 1)]
            }}
            whileHover={spin}
            transition={{
              ease: 'linear',
              duration: 0.25
            }}
          >
            {data.answered_everything === 'no' && (
              <div
                className={
                  'absolute top-0 left-0 w-full h-full rounded-full z-40 stripes'
                }
              />
            )}
            <p className={'font-bold text-xl sm:text-4xl text-white z-50'}>
              {data.short_name}
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  const OverlayContent = ({ data }) => {
    console.log(data)
    return (
      <div className={'cursor-pointer p-0 sm:p-5 relative max-w-6xl'}>
        <h1 className={'text-4xl sm:text-5xl mb-2 pr-6'}>{data.full_name}</h1>
        {data.headline !== '' && <p className={'italic'}>{data.headline}</p>}
        <hr className={'my-2 sm:my-8'} />
        <div className={'flow text-3xl'}>{renderHTML(data.content)}</div>
        <motion.p
          className={
            'fixed top-0 right-0 sm:top-6 sm:right-6 sm:top-4 sm:right-4 text-red-400 hover:bg-red-400 hover:text-white px-4 py-4 rounded-full'
          }
          // whileHover={{
          //   scale: 1.1
          // }}
        >
          <CloseIcon />
        </motion.p>
      </div>
    )
  }

  return (
    <div data-iframe-height={true}>
      {relevantData.length > 0 ? (
        <div
          className={`relative items-center justify-center grid grid-cols-${mobileCols} sm:grid-cols-${desktopCols} ${
            group === 'all' ? 'w-full' : 'w-4/5'
          } mx-auto my-8 lg:px-8`}
        >
          {relevantData.map((el, i) => {
            return (
              <Bubble
                key={`bubble-wrapper-${i}`}
                data={el}
                i={i}
                clickHandler={clickHandler}
                currentActive={currentActive}
              />
            )
          })}
          {currentActive >= 0 && (
            <div
              className={`${
                group === 'all' ? 'm-0' : 'm-0'
              } w-full h-full px-3 fixed top-0 left-0 bg-white bg-opacity-95 flex justify-center items-center`}
              onClick={() => setCurrentActive(-1)}
            >
              <OverlayContent data={relevantData[currentActive]} />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <div
        className={
          'flex justify-center items-center flex-col sm:flex-row px-12'
        }
      >
        {/* <div className={'flex flex-row items-center justify-end gap-x-2'}>
          <div
            className={'rounded-full w-12 h-12 sm:w-20 sm:h-20 bg-gray-400 flex-shrink-0'}
          />{' '}
          <p className={'p-0 m-0 leading-tight'}>Answered all requests</p>
        </div> */}
        <div className={'flex flex-row items-center justify-start gap-x-2'}>
          <div
            className={
              'rounded-full stripes-narrow w-12 h-12 sm:w-20 sm:h-20 bg-gray-400 flex-shrink-0'
            }
          />{' '}
          <p className={'p-0 m-0 leading-tight'}>
            Partially responded to survey questions and/or follow-ups
          </p>
        </div>
      </div>
    </div>
  )
}

export default FloatingBubbles

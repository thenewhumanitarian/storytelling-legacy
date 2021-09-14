import React, { useState, useEffect, useRef } from 'react'

// Importing Papaparse to pull data from Google Spreadsheet
import Papa from 'papaparse'

// Imports animation library
import { motion } from 'framer-motion'

// Importing d3-array for grouping data by colour
import './index.css'
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

  const colors = ['#9E3F53', '#4D82C1', '#40911F', '#0A103D', '#7D8FA9']

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
      <motion.div
        className={`relative w-full h-0`}
        style={{
          paddingTop: `${100}%`
        }}
        // initial={{ y: 0 }}
        animate={{
          y: currentActive > 0 ? null : [0, 5, -5, 0],
          rotate: currentActive > 0 ? null : [0, 2, -2, 0, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          delay: i * 0.2
        }}
        onClick={() => clickHandler(i)}
      >
        <div
          className={
            'absolute top-0 left-0 w-full h-full flex justify-center items-center'
          }
        >
          <motion.div
            className={`w-4/5 h-4/5 rounded-full flex justify-center items-center cursor-pointer`}
            style={{
              background: colors[getRandomInt(0, colors.length)]
            }}
            whileHover={spin}
            // whileTap={{
            //   scale: 1.2
            // }}
            transition={{
              ease: 'linear',
              duration: 0.25
            }}
          >
            <p className={'font-bold text-4xl text-white'}>{data.short_name}</p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  const OverlayContent = ({ data }) => {
    return (
      <div className={'cursor-pointer p-8 sm:p-20 relative max-w-6xl'}>
        <h1 className={'text-5xl mb-8'}>{data.full_name}</h1>
        <hr className={'mb-8'} />
        <div className={'flow text-3xl'}>{renderHTML(data.content)}</div>
        <motion.p
          className={
            'fixed top-2 right-6 sm:top-4 sm:right-4 text-red-400 hover:bg-red-400 hover:text-white px-4 py-4 rounded-full'
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
      {relevantData ? (
        <div
          className={`relative grid grid-cols-${mobileCols} sm:grid-cols-${desktopCols} ${
            group === 'all' ? 'w-full' : 'w-4/5'
          } mx-auto my-8`}
        >
          {relevantData.map((el, i) => {
            return (
              <Bubble
                key={`bubble-wrapper-${i}`}
                data={el}
                i={() => i}
                clickHandler={clickHandler}
                currentActive={currentActive}
              />
            )
          })}
          {currentActive >= 0 && (
            <div
              className={`${
                group === 'all' ? 'm-0' : 'm-4'
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
    </div>
  )
}

export default FloatingBubbles

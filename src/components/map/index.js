// @flow
import React, { useState, useEffect } from 'react'
import {
  MapContainer as Map,
  Marker,
  TileLayer,
  Popup,
  Tooltip,
  CircleMarker,
  LayersControl,
  FeatureGroup
} from 'react-leaflet'
import moment from 'moment'
import renderHTML from 'react-render-html'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { fetchData } from './fetchData'
import { greenMarkerIcon, orangeMarkerIcon } from './marker'
import L from 'leaflet'
import * as _ from 'underscore'

import 'leaflet/dist/leaflet.css'

const MapComponent = props => {
  const params = props.match.params
  const circleSizes = isMobile ? [3, 12] : [5, 30]

  const [mapData, setMapData] = useState({
    circleSize: circleSizes || [5, 25],
    lat1: params.lat1 || 76.248809,
    lng1: params.lng1 || 168.846,
    lat2: params.lat2 || 58.838593,
    lng2: params.lng2 || 179.914776,
    fetchedData: null,
    googleData: [],
    dataSource: '',
    lastUpdate: ''
  })

  useEffect(() => {
    if (mapData.googleData.length > 0) {
      return
    }
    fetchData(props.match.params.data, props.match.params.gsheetID).then(
      data => {
        if (data.length <= 0) {
          throw Error('No data found.')
        } else {
          // console.log(data);
          setMapData({
            ...mapData,
            fetchedData: data.data || null,
            googleData: data.googleData,
            dataSource: data.source || null,
            lastUpdate: data.lastUpdate
          })
        }
      }
    )
  }, [props.match.params.gsheetID, props.match.params.data, mapData])

  useEffect(() => {
    window.iFrameResizer = {
      heightCalculationMethod: 'taggedElement'
    }
  }, [])

  const {
    circleSize,
    fetchedData,
    lat1,
    lng1,
    lat2,
    lng2,
    googleData,
    dataSource,
    lastUpdate
  } = mapData

  /* Set boundaries for initial map zoom */
  const corner1 = L.latLng(lat1, lng1)
  const corner2 = L.latLng(lat2, lng2)
  const bounds = new L.latLngBounds(corner1, corner2)
  let maxAmount = 0
  if (fetchedData) {
    maxAmount = _.max(fetchedData.map(el => parseInt(el.Confirmed)))
  }

  let GoogleMarkers = googleData
    .filter(el => el.lat && el.lng && el.id)
    .map((el, i) => (
      <Marker
        key={`marker-${i}`}
        position={[parseFloat(el.lat), parseFloat(el.lng)]}
        icon={mapData.dataSource ? greenMarkerIcon : orangeMarkerIcon}
      >
        {!isMobile && (
          <Tooltip>
            <strong>Read more</strong>
          </Tooltip>
        )}
        <Popup>
          {!isMobile && el.imageUrl && (
            <a
              href={el.articleLink}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <img src={el.imageUrl} width={'100%'} alt={el.title} />
            </a>
          )}
          <div className={'flow popup-textbox'}>
            <h3>{el.title}</h3>
            <div
              className={`description-wrapper ${el.imageUrl ? 'hidden' : ''}`}
            >
              {renderHTML(el.description)}
            </div>
            {el.articleLink && (
              <p className={'read-more'}>
                <a
                  href={el.articleLink}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  Read more&nbsp;→
                </a>
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    ))

  let CircleMarkers

  if (fetchedData) {
    CircleMarkers = fetchedData
      .filter(el => parseInt(el.Confirmed) > 0 && el.Lat && el.Long_)
      .map((el, i) => (
        <CircleMarker
          key={`marker-${i}`}
          center={[parseFloat(el.Lat) || 100, parseFloat(el.Long_) || 100]}
          color='red'
          fillOpacity={el.Confirmed < 500 ? 0.4 : 0.6}
          fillColor={'#a03c50'}
          stroke={false}
          radius={
            circleSize[0] + (parseInt(el.Confirmed) / maxAmount) * circleSize[1]
          }
        >
          {!isMobile && (
            <Tooltip>
              <strong>{el['Country_Region']}</strong>&nbsp;
              {el['Province_State']}
            </Tooltip>
          )}
          <Popup>
            <h2>{el['Country_Region']}</h2>
            <h4>{el['Province_State']}</h4>
            <p className={'confirmed'}>
              Confirmed: <strong>{el['Confirmed']}</strong>
            </p>
            <p className={'recovered'}>
              Recovered: <strong>{el['Recovered']}</strong>
            </p>
            <p className={'deaths'}>
              Deaths: <strong>{el['Deaths']}</strong>
            </p>
            <p className={'last-updated'}>
              Updated: <strong>{moment(el['Last Update']).format('L')}</strong>
            </p>
          </Popup>
        </CircleMarker>
      ))
  }

  const StyledDiv = styled.div`
    .leaflet-control {
      a {
        color: #a03c50;
        text-decoration: none;
      }
    }
    .popup-textbox {
      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.8rem;

        @media screen and (max-width: 500px) {
          font-size: 1.4rem;
        }
      }
      .description-wrapper {
        max-height: 120px;
        overflow-y: auto;
        margin-top: 0;

        a {
          color: #63666a;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #63666a;

          &:hover {
            background: #63666a;
            color: white;
          }
        }

        @media screen and (max-width: 500px) {
          &.hidden {
            display: none;
          }
        }
      }
      p {
        font-size: 1.4rem;
        line-height: 1.142;
        font-family: roboto, sans-serif;
        color: #63666a;
        text-align: left;
        margin-top: 0;

        @media screen and (max-width: 500px) {
          font-size: 1.2rem;
        }
      }
    }

    .leaflet-control-container {
      @media screen and (max-width: 500px) {
        display: none;
      }
    }
    .data-source {
      position: fixed;
      bottom: 16px;
      right: 0;
      text-align: right;
      z-index: 999;
      background: rgba(255, 255, 255, 0.7);
      padding: 2px 5px;
      p {
        margin: 0;
        font-size: 11px;
      }
      a {
        color: #a03c50;
        text-decoration: none;
      }
      @media screen and (max-width: 500px) {
        display: none;
      }
    }
    /* Styles for Map Component */
    .leaflet-container {
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 0 !important;
      .leaflet-popup-content {
        font-family: Roboto, sans-serif;
        width: auto;
        font-size: 1.1em;
        margin: 1rem;
        strong {
          font-weight: 800;
        }

        p {
          font-size: 1.4rem;
          line-height: 1.142;
        }

        p.lead {
          @media screen and (max-width: 500px) {
            display: none;
          }
        }
        .read-more {
          padding-top: 0.5rem;

          a {
            color: #63666a;
            font-weight: 500;
            border-bottom: 1px solid #63666a;

            &:hover {
              color: white;
              background: #63666a;
            }
          }
        }
        @media screen and (max-width: 500px) {
          max-width: 240px;
          margin: 0.3rem;
        }
        img {
          max-height: 140px;
          height: 140px;
          object-fit: cover;
          object-position: center;
          border-bottom: 2px solid transparent;
        }
        img:hover {
          cursor: pointer;
          border-bottom: 2px solid #a03c50;
        }
        .deaths {
          color: #a03c50;
          line-height: 1.5;
        }
        .confirmed {
          color: #f0781e;
          padding-top: 10px;
          line-height: 1.5;
        }
        .recovered {
          color: #2db487;
          line-height: 1.5;
        }
        .last-updated {
          font-style: italic;
          padding-top: 0.5rem;
          color: rgba(0, 0, 0, 0.5);
        }
        p,
        h2 {
          margin: 0;
          line-height: 1.5;
        }
        h4 {
          margin-top: 0;
        }
      }
    }
  `

  return (
    <StyledDiv id={'map-component'} data-iframe-height>
      <Map
        bounds={bounds}
        style={{ width: '100%', height: '100vh' }}
        tap={isMobile}
      >
        <LayersControl position='topright' collapsed={true}>
          <LayersControl.BaseLayer name='Basemap' checked>
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
              // url='https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
              url='https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          {mapData.fetchedData && (
            <LayersControl.Overlay name='Circles' checked>
              <FeatureGroup color='purple'>{CircleMarkers}</FeatureGroup>
            </LayersControl.Overlay>
          )}
          {mapData.googleData.filter(el => el.id !== '').length > 0 && (
            <LayersControl.Overlay name='Markers' checked>
              <FeatureGroup color='yellow'>{GoogleMarkers}</FeatureGroup>
            </LayersControl.Overlay>
          )}
        </LayersControl>
      </Map>
      {dataSource && (
        <div className={'data-source'}>
          <p>
            Data:{' '}
            <strong>
              <a target='_blank' rel='noopener noreferrer' href={dataSource[0]}>
                {dataSource[1]}
              </a>
            </strong>{' '}
            (Last update: {lastUpdate})
          </p>
        </div>
      )}
    </StyledDiv>
  )
}

export default MapComponent

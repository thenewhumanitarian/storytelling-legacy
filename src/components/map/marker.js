import L from 'leaflet'

const iconUrl = require('./images/tnh-marker-green.png').default
const iconRetinaUrl = require('./images/tnh-marker-green@2x.png').default
const orangeIconUrl = require('./images/tnh-marker-orange.png').default
const orangeRetinaUrl = require('./images/tnh-marker-orange@2x.png').default
const shadowUrl = require('./images/tnh-marker-shadow@2x.png').default

const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconSize: [26, 41],
  iconAnchor: [13, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
})

const greenMarkerIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  iconSize: [32, 47],
  iconAnchor: [13, 47],
  shadowUrl: shadowUrl,
  shadowSize: [27, 9],
  shadowAnchor: [11, -2]
})

const orangeMarkerIcon = new L.Icon({
  iconUrl: orangeIconUrl,
  iconRetinaUrl: orangeRetinaUrl,
  iconSize: [32, 47],
  iconAnchor: [13, 47],
  shadowUrl: shadowUrl,
  shadowSize: [27, 9],
  shadowAnchor: [11, -2]
  // iconSize: new L.Point(60, 75),
  // className: 'leaflet-div-icon'
})

export { markerIcon, greenMarkerIcon, orangeMarkerIcon }
